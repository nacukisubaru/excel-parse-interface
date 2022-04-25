import React from "react";
import Snack from "../../SnackBar/Snack";
import { showSnack } from "../../../redux/actions/appActions";
import { useSelector, useDispatch } from "react-redux";

export default function Message() {

    const appManager = useSelector(state => state.appManager);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(showSnack(false));
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