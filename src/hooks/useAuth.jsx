import React, { useState, useContext, createContext } from "react";
import jwt_decode from "jwt-decode";
import api from "../services/api";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = (username, password) => {
        return api.post("/user/authenticate", {username, password})
            .then( ({ data }) => {
                localStorage.setItem("jwt", data.token);
                const decoded = jwt_decode(data.token)
                setUser(decoded);
                return true;
            })
            .catch(error => {
                return false;
            });
        
    };

    const signout = () => {
        localStorage.removeItem("jwt");
        setUser(null);
    };

    const isAuthenticated = () => {
        return localStorage.getItem("jwt") !== undefined;
    }

    return {
        user,
        signin,
        signout,
    };

}