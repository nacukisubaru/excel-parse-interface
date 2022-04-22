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
        let result = [];
        let count = 0;
        const parse = (data) => {
            for(var obj in data) {
                //console.log(data[obj]);
                if(Array.isArray(data[obj])) {
                    parse(data[obj]);
                } else if(typeof data[obj] === "object") {
                    count++;
                    let space = '';
                    for(var inc = 0; inc < count; inc++) {
                        space += '.';
                    }
                    data[obj].NAME = space + data[obj].NAME;
                    data[obj].id = count;
                    parse(data[obj]);
                } else {
                    result.push(data);
                }
            }
        }
        parse(data);
        return result;
    }

    console.log(excelData);
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
