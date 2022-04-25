import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(snackProps) {
    let snackObj = snackProps.props.snackObj;

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={snackObj.isOpen} autoHideDuration={6000} onClose={()=>{snackObj.handleClose()}}>
                <Alert
                    onClose={()=>{snackObj.handleClose()}}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {snackObj.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
