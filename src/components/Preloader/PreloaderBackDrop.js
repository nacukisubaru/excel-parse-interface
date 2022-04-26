import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTogglePreloader } from "../../hooks/appHooks";

export default function PreloaderBackDrop() {
    const backDrop = useTogglePreloader();

    return (
        <div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={backDrop.isShow}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
