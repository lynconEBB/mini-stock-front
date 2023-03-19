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
    const signin = (username, password) => {
        return api.post("/user/authenticate", {username, password})
            .then( ({ data }) => {
                localStorage.setItem("jwt", data.token);
                return true;
            })
            .catch(error => {
                return false;
            });
        
    };

    const signout = () => {
        localStorage.removeItem("jwt");
    };

    const isAuthenticated = () => {
        return localStorage.getItem("jwt") !== null;
    }

    const getUser = () => {
        return jwt_decode(localStorage.getItem("jwt"));
    }

    return {
        isAuthenticated,
        getUser,
        signin,
        signout,
    };

}