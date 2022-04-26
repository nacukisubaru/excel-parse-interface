import React from "react";
import Snack from "../../SnackBar/Snack";
import { useSelector } from "react-redux";
import { useShowMessage } from "../../../hooks/appHooks";

export default function Message() {

    const appManager = useSelector(state => state.appManager);
    const message = useShowMessage();

    const handleClose = () => {
        message.close();
    }

    const snackObj = {
        statusAlert: appManager.message.status,
        message: appManager.message.name,
        isOpen: appManager.showSnack,
        handleClose
    };

    return (
        <div>
            <Snack props={{snackObj}}></Snack>
        </div>
    );
}