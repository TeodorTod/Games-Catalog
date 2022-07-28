import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
    const { user } = useContext(AuthContext);
    const guestNavigation = (
        <>
            <div id="guest">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </>
    );

    const userNavigation = (
        <>
            <div id="user">
                <Link to="/create">Create Game</Link>
                <Link to="/logout">Logout</Link>
            </div>
        </>
    );

    return (
        <header>

            <h1>
                <Link to="/" className="home" href="#">
                    GamesPlay
                </Link>
            </h1>
            
            <nav>
                {user.email && <span>{user.email}</span>}
                <Link to="/catalog">All games</Link>
                {user.email
                    ? userNavigation
                    : guestNavigation}
            </nav>


            
        </header>
    );
}

export default Header;

