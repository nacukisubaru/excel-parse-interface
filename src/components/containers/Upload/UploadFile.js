import React from "react";
import RestApi from "../../../api/restApi";
import UploadButton from "../../Upload/UploadButton";
import { setExcelData } from "../../../redux/actions/excelActions";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../../Table/DataTable";

export default function UploadFile() {
    const dispatch = useDispatch();
    let excelData = useSelector((state) => state.excelManager.excelData);

    const sendFile = async (formData) => {
        let rest = new RestApi("token");
        let response = await rest.sendRequest("post", "/users", formData);
        return response;
    };

    const handlerUploadFile = async (event) => {
        let file = event.target.files[0];
        let extension = file.name.split(".").pop();
        if (extension === "xlsx") {
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

    const parseExcelData = (data) => {
        return data;
    }

    excelData = parseExcelData(excelData);

    const uploadObj = {
        handlerUploadFile,
    };


    const excelObj = {
        excelData,
    };

    return (
        <div>
            <UploadButton props={{ uploadObj }}></UploadButton>
            <DataTable props={{ excelObj }}></DataTable>
        </div>
    );
}
