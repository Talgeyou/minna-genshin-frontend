import React, { useCallback, useEffect, useState } from "react";
import styles from "./App.module.scss";
import axios from "axios";
import { Button } from "./components/Button/Button";
import { AuthForm } from "./components/AuthForm/AuthForm";
import { UserPage } from "./pages/UserPage/UserPage";
import { Layout } from "./components/Layout/Layout";

export const TokenContext = React.createContext<string | null>(null);

export const App = () => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<{ email: string; firstName: string; lastName: string } | null>(
        null,
    );

    const handleAuth = useCallback((newToken: string) => {
        setToken(newToken);
    }, []);

    const handleSignOut = useCallback(() => {
        setToken(null);
        setUser(null);
    }, []);

    const handleEdit = useCallback(
        (user: { firstName: string; lastName: string; email: string }) => {
            setUser(user);
        },
        [],
    );

    useEffect(() => {
        if (!user && token) {
            axios({
                method: "GET",
                url: "http://localhost:4000/users/me",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => setUser(res.data));
        }
    }, [token, user]);

    return (
        <TokenContext.Provider value={token}>
            <Layout onSignOut={handleSignOut}>
                {!token && <AuthForm onAuth={handleAuth} />}

                {user && <UserPage user={user} onEdit={handleEdit} />}
            </Layout>
        </TokenContext.Provider>
    );
};
