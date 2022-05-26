import React, { useContext, useEffect } from "react";
import { TokenContext } from "../../App";
import { Button } from "../Button/Button";
import styles from "./Header.module.scss";

type Props = {
    onSignOut: () => void;
};

export const Header: React.FC<Props> = (props) => {
    const { onSignOut } = props;
    const token = useContext(TokenContext);
    useEffect(() => {
        console.log({ token });
    }, [token]);

    return (
        <header className={styles.Header}>
            <div className={styles.Header_Auth}>
                <Button variant="info" onClick={onSignOut}>
                    {token ? "Выйти" : "Войти"}
                </Button>
            </div>
        </header>
    );
};
