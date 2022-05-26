import React, { useCallback, useState } from "react";
import { Button } from "../../components/Button/Button";
import { UserEditForm } from "../../components/UserEditForm/UserEditForm";
import styles from "./UserPage.module.scss";

type Props = {
    user: { email: string; firstName: string; lastName: string };
    onEdit?: (user: { firstName: string; lastName: string; email: string }) => void;
};

export const UserPage: React.FC<Props> = (props) => {
    const { user, onEdit } = props;

    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = useCallback(() => {
        setEditMode((prev) => !prev);
    }, []);

    const handleSubmit = useCallback(
        (user: { firstName: string; lastName: string; email: string }) => {
            setEditMode(false);
            if (onEdit) {
                onEdit(user);
            }
        },
        [onEdit],
    );

    return (
        <div className={styles.User}>
            <div className={styles.User_Name}>
                {user.firstName} {user.lastName}
            </div>
            <div className={styles.User_Email}>{user.email}</div>
            {editMode && (
                <UserEditForm
                    firstName={user.firstName}
                    lastName={user.lastName}
                    onSubmit={handleSubmit}
                />
            )}
            <Button variant={editMode ? "danger" : "primary"} onClick={toggleEditMode}>
                {editMode ? "Отменить" : "Редактировать"}
            </Button>
        </div>
    );
};
