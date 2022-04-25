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
        let countLevel = 0;

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

        const generateNamesWithSpaces = (data) => {
            for (var item in data) {
                if(data[item].hasOwnProperty("ITEMS")) { 
                    for(var itemObj in data[item].ITEMS) {
                        data[item].ITEMS[itemObj].NAME = generateSpaces(countLevel) + data[item].ITEMS[itemObj].NAME;
                    }
                }
            }
        }    

        const parse = (data) => {
            for (var obj in data) {
                if (typeof data[obj] === "object") {
                    if (data[obj].hasOwnProperty("ITEMS")) {
                        countLevel++;
                        for (var item in data[obj].ITEMS) {
                            if (typeof data[obj].ITEMS[item] === "object") {
                                data[obj].ITEMS[item].NAME = generateSpaces(countLevel) + data[obj].ITEMS[item].NAME;
                                if (result.indexOf(data[obj].ITEMS[item]) > -1) {
                                    parse(data[obj].ITEMS[item]);
                                }
                                if(data[obj].ITEMS[item].hasOwnProperty("ITEMS")) {
                                    generateNamesWithSpaces(data[obj].ITEMS[item].ITEMS);
                                }
                            }
                        }
                    }
                    parse(data[obj]);
                    if (data[obj].hasOwnProperty("ITEMS")) {
                        countLevel = 0;
                    }
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
            return true;
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
