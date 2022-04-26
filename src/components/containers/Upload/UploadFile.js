import React from "react";
import RestApi from "../../../api/restApi";
import DataTable from "../../Table/DataTable";
import { setExcelData, setParsedData } from "../../../redux/actions/excelActions";
import { useSelector, useDispatch } from "react-redux";
import { useShowMessage } from "../../../hooks/appHooks";
import { useTogglePreloader } from "../../../hooks/appHooks";

export default function UploadFile() {
    const dispatch = useDispatch();
    const message = useShowMessage();
    const preloader = useTogglePreloader();
    let excelManager = useSelector((state) => state.excelManager);

    const sendFile = async (formData) => {
        let rest = new RestApi();
        let response = await rest.sendFile(formData);
        return response;
    };

    const handlerUploadFile = async (event) => {
        let file = event.target.files[0];
        let extension = file.name.split(".").pop();
        preloader.toggle(true);
        if (extension === "xlsx") {
            let formData = new FormData();
            formData.append("file", file);
            const originalExcelData = await sendFile(formData);
            const excelDataForParsing = await sendFile(formData);
    
            dispatch(setExcelData(originalExcelData));
            dispatch(setParsedData(parseExcelData(excelDataForParsing)));
        } else {
            message.show("Файл не является xlsx", "error");
        }
        preloader.toggle(false);
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
            var hash = 0;
            for (var i = 0; i < obj.length; i++) {
                var code = obj.charCodeAt(i);
                hash = (hash << 5) - hash + code;
                hash = hash & hash; // Convert to 32bit integer
            }

            return hash + Math.floor(Math.random() * 1000000000000000000);
        };

        const generateNamesWithSpaces = (data) => {
            for (var item in data) {
                if (data[item].hasOwnProperty("ITEMS")) {
                    for (var itemObj in data[item].ITEMS) {
                        data[item].ITEMS[itemObj].TITLE =
                            generateSpaces(countLevel) +
                            data[item].ITEMS[itemObj].TITLE;
                    }
                }
            }
        };

        const parse = (data) => {
            for (var obj in data) {
                if (typeof data[obj] === "object") {
                    if (data[obj].hasOwnProperty("ITEMS")) {
                        countLevel++;
                        for (var item in data[obj].ITEMS) {
                            if (typeof data[obj].ITEMS[item] === "object") {
                                data[obj].ITEMS[item].TITLE =
                                    generateSpaces(countLevel) +
                                    data[obj].ITEMS[item].TITLE;
                                if (
                                    result.indexOf(data[obj].ITEMS[item]) > -1
                                ) {
                                    parse(data[obj].ITEMS[item]);
                                }
                                if (
                                    data[obj].ITEMS[item].hasOwnProperty(
                                        "ITEMS"
                                    )
                                ) {
                                    generateNamesWithSpaces(
                                        data[obj].ITEMS[item].ITEMS
                                    );
                                }
                            }
                        }
                    }
                    parse(data[obj]);
                    if (!data[obj].hasOwnProperty("ITEMS")) {
                        countLevel = 1;
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


    const excelObj = {
        excelDataArray:excelManager.excelDataParsed,
        handlerUploadFile
    };

    return (
        <>
            <div style={{display:'flex', justifyContent:'center', marginTop: "30px"}}>
                <DataTable props={{ excelObj }}></DataTable>
            </div>
        </>
    );
}