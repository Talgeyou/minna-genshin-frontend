import React, { HTMLProps } from "react";
import styles from "./Button.module.scss";

type Props = {
    variant?: "primary" | "success" | "danger" | "info";
};

export const Button: React.FC<Props & HTMLProps<HTMLButtonElement>> = (props) => {
    const { children, onClick, variant } = props;
    let className = styles.Button;
    if (variant === "danger") {
        className += ` ${styles.Button_Variant_Danger}`;
    }

    if (variant === "success") {
        className += ` ${styles.Button_Variant_Success}`;
    }
    if (variant === "info") {
        className += ` ${styles.Button_Variant_Info}`;
    }

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};
