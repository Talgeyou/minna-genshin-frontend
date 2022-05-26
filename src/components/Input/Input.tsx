import React, { HTMLProps, useCallback } from "react";
import styles from "./Input.module.scss";

type Props = {
    label?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const Input: React.FC<HTMLProps<HTMLInputElement> & Props> = (props) => {
    const { id, label, value, type, onChange } = props;
    return (
        <div className={styles.Input}>
            <input
                id={id}
                className={styles.Input_Input}
                type={type}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={id} className={styles.Input_Label}>
                {label}
            </label>
        </div>
    );
};
