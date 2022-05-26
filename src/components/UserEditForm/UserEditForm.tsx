import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import { TokenContext } from "../../App";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./UserEditForm.module.scss";

type Props = {
    firstName: string;
    lastName: string;
    onSubmit?: (user: { firstName: string; lastName: string; email: string }) => void;
};

export const UserEditForm: React.FC<Props> = (props) => {
    const { firstName, lastName, onSubmit } = props;
    const token = useContext(TokenContext);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);

    const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewFirstName(event?.target.value);
        },
        [],
    );
    const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewLastName(event?.target.value);
        },
        [],
    );

    const handleChangeName = () => {
        axios({
            method: "PUT",
            url: "http://localhost:4000/users/name",
            data: { firstName: newFirstName, lastName: newLastName },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (onSubmit) {
                onSubmit(res.data);
            }
        });
    };

    return (
        <div className={styles.Edit}>
            <div className={styles.Edit_Field}>
                <Input
                    id="new-first-name"
                    type="text"
                    label={"First Name"}
                    value={newFirstName}
                    onChange={handleFirstNameChange}
                />
            </div>
            <div className={styles.Edit_Field}>
                <Input
                    id="new-last-name"
                    type="text"
                    label={"Last Name"}
                    value={newLastName}
                    onChange={handleLastNameChange}
                />
            </div>
            <div className={styles.Edit_Field}>
                <Button variant="success" onClick={handleChangeName}>
                    Изменить
                </Button>
            </div>
        </div>
    );
};
