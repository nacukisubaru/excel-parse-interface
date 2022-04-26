import React from "react";
import CustomButton from "../../CustomButton/CustomButton";
import RestApi from "../../../api/restApi";
import { useSelector } from "react-redux";
import { useShowMessage } from "../../../hooks/appHooks";

export default function CreateTask() {
    const rest = new RestApi();
    const message = useShowMessage();
    let excelManager = useSelector((state) => state.excelManager);

    const handleClick = () => {
        if(excelManager.excelData.length > 0) {
            rest.createTasks(excelManager.excelData).then(() => {
                message.show("Задачи успешно созданы!", "success");
            });
        } else {
            message.show("Файл xlsx не был загружен! Загрузите excel файл перед созданием задач", "error");
        }
    }

    return (
        <CustomButton props={{
            name: "Создать задачи в Битрикс 24",
            handleClick
        }}></CustomButton>
    );
}