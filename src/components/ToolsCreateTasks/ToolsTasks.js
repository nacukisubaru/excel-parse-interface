import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import SelectList from "../SelectList/SelectList";
import { Grid } from "@mui/material";

export default function ToolsTasks(props) {
    let tools = props.props;
    return (
        <div>
            <Grid
                style={{ marginTop: 1, marginBottom: "6px" }}
                container
                spacing={1}
            >
                <Grid item={true} style={{ width: 300, marginRight: 5 }}>
                    <SelectList
                        props={{ selectList: tools.selectPortal }}
                    ></SelectList>
                </Grid>
                {tools.selectGroup.isActive && (
                    <Grid item={true} style={{ width: 300, marginRight: 5 }}>
                        <SelectList
                            props={{ selectList: tools.selectGroup }}
                        ></SelectList>
                    </Grid>
                )}
                <Grid item={true} style={{ marginTop: "9px" }}>
                    <CustomButton props={{ customButton: tools.createTaskBtn }}></CustomButton>
                </Grid>
            </Grid>
            
        </div>
    );
}
