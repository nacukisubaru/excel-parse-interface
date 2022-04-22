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
            dispatch(setExcelData(result));
            return true;
        }
        console.log("Файл не является xlsx");
        return false;
    };

    const parseExcelData = (data) => {
        let result = [];

        const generateSpaces = (level) => {
            let space = "";
            for (var inc = 0; inc < level; inc++) {
                space += ".";
            }
            return space;
        };

        const generateHashCode = (obj) => {
            var hc = 0;
            var chars = JSON.stringify(obj).replace(/\{|\"|\}|\:|,/g, "");
            var len = chars.length;
            for (var i = 0; i < len; i++) {
                // Bump 7 to larger prime number to increase uniqueness
                hc += chars.charCodeAt(i) * 7;
            }
            return hc + Math.floor(Math.random() * 1000000000000000000);
        };

        const parse = (data) => {
            for (var obj in data) {
                if (typeof data[obj] === "object") {

                    if (data[obj].hasOwnProperty("ITEMS")) {
                        for (var item in data[obj].ITEMS) {
                            if (typeof data[obj].ITEMS[item] === "object") {
                                if (result.indexOf(data[obj].ITEMS[item]) > -1) {
                                    parse(data[obj].ITEMS[item]);
                                }
                            }
                        }
                    }

                    parse(data[obj]);
                } else {
                    result.push(data);
                }
            }
        };

        parse(data);
        let arrayExcelData = [];
        result.map((item) => {
            if (arrayExcelData.indexOf(item) === -1) {
                item.id = generateHashCode(item);
                arrayExcelData.push(item);
            }
        });

        return arrayExcelData;
    };

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
