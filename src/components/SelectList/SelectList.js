import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectList(props) {
    let selectObj = {
        isActive: true,
        labelValue: '',
        selectedValue: '',
        items: [],
        handleChange: function() {}
    };
    
    if(props.props.selectList) {
        selectObj = props.props.selectList;
    }

    return (
        <div>
            {selectObj.isActive && (<Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        {selectObj.labelValue}
                    </InputLabel>
                    {selectObj.items && selectObj.items.length > 0 && (
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={
                                selectObj.selectedValue
                                    ? selectObj.selectedValue
                                    : ""
                            }
                            label={selectObj.labelValue}
                            onChange={(event) => {
                                selectObj.handleChange(event);
                            }}
                        >
                            {selectObj.items.map((item) => {
                                return (
                                    <MenuItem value={item.id} key={item.id}>
                                        {item.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    )}
                </FormControl>
            </Box>)}
        </div>
    );
}
