import { Suspense, useEffect, lazy, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

import * as gameService from './services/gameService';

import { GameContext } from "./contexts/GameContext";
import { AuthProvider } from "./contexts/AuthContext";

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import CreateGame from './components/CreateGame/CreateGame';
import Catalog from './components/Catalog/Catalog';
import GameDetails from './components/GameDetails/GameDetails';


import './App.css';
import Logout from "./components/Logout/Logout";
import EditGame from "./components/EditGame/EditGame";


const Register = lazy(() => import('./components/Register/Register'));


function App() {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();



    const addComment = (gameId, comment) => {
        setGames(state => {
            const game = state.find(x => x._id == gameId);
            const comments = game.comments || [];
            comments.push(comment);

            return [
                ...state.filter(x => x._id !== gameId),
                { ...game, comments }
            ]
        })
    }

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);

    const gameAdd = (gameData) => {
        setGames(state => [
            ...state,
            {
                ...gameData,
                _id: uniqid()
            }
        ])

        navigate('/catalog');
    };

    const gameEdit = (gameId, gameData) => {
        setGames(state => state.map(x => x._id == gameId ? gameData : x));
    };

    return (
        <AuthProvider>
            <div id="box">
                <Header />
                {/* Main Content */}
                <main id="main-content">
                    <GameContext.Provider value={{ games, gameAdd, gameEdit }}>
                        <Routes>
                            <Route path='/' element={<Home games={games} />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={
                                <Suspense fallback={<span>Loading....</span>}>
                                    <Register />
                                </Suspense>}
                            />
                            <Route path="/logout" element={<Logout />} />
                            <Route path='/create' element={<CreateGame />} />
                            <Route path='/games/:gameId/edit' element={<EditGame />} />
                            <Route path='/catalog' element={<Catalog games={games} />} />
                            <Route path='/catalog/:gameId' element={<GameDetails games={games} addComment={addComment} />} />
                        </Routes>
                    </GameContext.Provider>
                </main>

            </div>
        </AuthProvider>
    );
}

export default App;
