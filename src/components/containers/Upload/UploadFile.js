import React from "react";
import RestApi from "../../../api/restApi";
import DataTable from "../../Table/DataTable";
import { setExcelData, setParsedData } from "../../../redux/actions/excelActions";
import { useSelector, useDispatch } from "react-redux";
import { useShowMessage } from "../../../hooks/appHooks";
import { useTogglePreloader } from "../../../hooks/appHooks";
import { transliterate as slugify} from 'transliteration';

export default function UploadFile() {
    const dispatch = useDispatch();
    const message = useShowMessage();
    const preloader = useTogglePreloader();
    let excelManager = useSelector((state) => state.excelManager);

    const sendFile = async (formData) => {
        let rest = new RestApi();
        let response = await rest.sendFile(formData);
        if(response.status !== 201) {
            message.show(response.statusText, "error");
            return false;
        }
        return response.data;
    };

    const handlerUploadFile = async (event) => {
        let file = event.target.files[0];
        let extension = file.name.split(".").pop();
        let fileName = slugify(file.name.split(".")[0]).replaceAll(' ', '-');
        const newFile = new File([file], fileName + '.xlsx');
        preloader.toggle(true);
        if (extension === "xlsx") {
            let formData = new FormData();
            formData.append("files", newFile);
            const originalExcelData = await sendFile(formData);
            const excelDataForParsing = JSON.parse(JSON.stringify(originalExcelData))

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
                let innerData = data[item];
                if (innerData.hasOwnProperty("ITEMS") && innerData.ITEMS.length > 0) {
                    generateNamesWithSpaces(innerData.ITEMS);
                }

                if (innerData.hasOwnProperty("ITEMS")) {
                    innerData.TITLE = generateSpaces(countLevel) + innerData.TITLE;
                }
            }
        };

        const parse = (data) => {
            for (var obj in data) {
                let innerData = data[obj];
                if (typeof innerData === "object") {
                    if (innerData.hasOwnProperty("ITEMS")) {
                        countLevel++;
                        if(innerData.ITEMS.length > 0) {
                            let itemsData = innerData.ITEMS;
                            for (var item in itemsData) {
                                if (typeof itemsData[item] === "object") {
                                    itemsData[item].TITLE = generateSpaces(countLevel) + itemsData[item].TITLE;
                                    if (itemsData[item].hasOwnProperty("ITEMS") && itemsData[item].ITEMS.length > 0) {
                                        generateNamesWithSpaces(itemsData[item].ITEMS);
                                    }
                                    if (result.indexOf(itemsData[item]) > -1) {
                                        parse(itemsData[item]);
                                    }
                                }
                            }
                        }
                    }
                    parse(innerData);
                    if (!innerData.hasOwnProperty("ITEMS")) {
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
                if(!Array.isArray(item)) {
                    item.id = generateHashCode(item);
                    arrayExcelData.push(item);
                }
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