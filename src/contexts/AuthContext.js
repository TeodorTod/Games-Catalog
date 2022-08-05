import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userRegister = (authData) => {
        setAuth(authData);
    }

    const userLogout = () => {
        setAuth({});
    }

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout, userRegister }}>
            {children}
        </AuthContext.Provider>
    )
}

export const withAuth = (Component) => {
    const WrapperComponent = (props) => {
        const context = useContext(AuthContext);
        return <Component {...props} auth={context}/>
    };

    return WrapperComponent;
};

