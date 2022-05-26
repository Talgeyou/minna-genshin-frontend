import axios from "axios";
import React, { useCallback, useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./AuthForm.module.scss";

type Props = {
    onAuth: (token: string) => void;
};

export const AuthForm: React.FC<Props> = (props) => {
    const { onAuth } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event?.target.value);
        },
        [],
    );

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event?.target.value);
        },
        [],
    );

    const handleSignIn = () => {
        axios({
            method: "POST",
            url: "http://localhost:4000/auth/signin",
            data: { email, password },
        })
            .then((res) => onAuth(res.data.access_token))
            .catch((error) => {
                if (error.response.status === 403) {
                    setError("Неверные данные");
                } else {
                    setError("Проверьте введённые данные");
                }
            });
    };

    const handleSignUp = () => {
        axios({
            method: "POST",
            url: "http://localhost:4000/auth/signup",
            data: { email, password },
        })
            .then((res) => onAuth(res.data.access_token))
            .catch((error) => {
                if (error.response.status === 403) {
                    setError("Email занят");
                } else {
                    setError("Проверьте введённые данные");
                }
            });
    };

    return (
        <div className={styles.Auth}>
            {error && <div className={styles.Auth_Error}>{error}</div>}
            <div className={styles.Auth_Field}>
                <Input
                    id="email"
                    type="email"
                    label={"Email"}
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className={styles.Auth_Field}>
                <Input
                    id="password"
                    type="password"
                    label={"Password"}
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className={styles.Auth_Field}>
                <Button onClick={handleSignIn}>Войти</Button>
            </div>
            <div className={styles.Auth_Field}>
                <Button onClick={handleSignUp}>Зарегистрироваться</Button>
            </div>
        </div>
    );
};
