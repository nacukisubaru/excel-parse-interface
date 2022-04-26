import React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButton(props) {
    return (
        <div>
            <Stack direction="row" style={{marginBottom:'9px'}} alignItems="center" spacing={2}>
                <label htmlFor="contained-button-file">
                    <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={(event) => {
                            props.props.handlerUploadFile(event);
                        }}
                    />
                    <Button variant="contained" component="span">
                        Загрузить
                    </Button>
                </label>
            </Stack>
        </div>
    );
}
