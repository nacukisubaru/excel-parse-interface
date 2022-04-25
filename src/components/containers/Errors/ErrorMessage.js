import React from "react";
import Snack from "../../SnackBar/Snack";

export default function ErrorMessage(props) {
    const messageObj = {
        text: props.props.message.text
    };

    return (
        <div>
            <Snack props={{messageObj}}></Snack>
        </div>
    );
}