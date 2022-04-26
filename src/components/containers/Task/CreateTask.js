import React from "react";
import CustomButton from "../../CustomButton/CustomButton";
import RestApi from "../../../api/restApi";
import { useSelector } from "react-redux";
import { useShowMessage, useTogglePreloader } from "../../../hooks/appHooks";

export default function CreateTask() {
    const rest = new RestApi();
    const message = useShowMessage();
    const preloader = useTogglePreloader();
    let excelManager = useSelector((state) => state.excelManager);

    const handleClick = async () => {
        preloader.toggle(true);
        if(excelManager.excelData.length > 0) {
          await  rest.createTasks(excelManager.excelData).then(() => {
                message.show("Задачи успешно созданы!", "success");
            });
        } else {
            message.show("Файл xlsx не был загружен! Загрузите excel файл перед созданием задач", "error");
        }
        preloader.toggle(false);
    }

    return (
        <CustomButton props={{
            name: "Создать задачи в Битрикс 24",
            handleClick
        }}></CustomButton>
    );
}