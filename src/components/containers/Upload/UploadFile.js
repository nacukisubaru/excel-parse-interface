import React from "react";
import RestApi from "../../../api/restApi";
import UploadButton from "../../Upload/UploadButton";
import { setExcelData } from "../../../redux/actions/excelActions";
import { useSelector, useDispatch } from "react-redux";

export default function UploadFile() {
    const dispatch = useDispatch();
    
    const sendFile = async (formData) => {
        let rest = new RestApi("token");
        let response = await rest.sendRequest("post", "/users", formData);
        return response;
    };

    const handlerUploadFile = async (event) => {
        let file = event.target.files[0];
        let extension = file.name.split('.').pop();
        if(extension === "xlsx") {
            let formData = new FormData();
            formData.append("file", file);
            let result = await sendFile(formData);
            console.log(result);
            dispatch(setExcelData(result));
            return true;
        }
        console.log("Файл не является xlsx");
        return false;
    };

    const uploadObj = {
        handlerUploadFile,
    };

    return (
        <div>
            <UploadButton props={{ uploadObj }}></UploadButton>
        </div>
    );
}
