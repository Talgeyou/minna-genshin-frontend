import React, { HTMLProps } from "react";
import { Header } from "../Header/Header";
import styles from "./Layout.module.scss";

type Props = {
    onSignOut: () => void;
};

export const Layout: React.FC<HTMLProps<HTMLDivElement> & Props> = (props) => {
    const { children, onSignOut } = props;
    return (
        <div className={styles.Page}>
            <Header onSignOut={onSignOut} />
            <main className={styles.Page_Content}>{children}</main>
        </div>
    );
};
