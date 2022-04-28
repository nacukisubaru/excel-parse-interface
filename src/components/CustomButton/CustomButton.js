import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function CustomButton(props) {
    let buttonObj = props.props.customButton;
    return (
        <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={(event)=>{buttonObj.handleClick(event)}}>{buttonObj.name}</Button>
        </Stack>
    );
}