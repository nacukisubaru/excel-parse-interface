import React from "react";
import CustomButton from "../../CustomButton/CustomButton";
import RestApi from "../../../api/restApi";
import { setMessage } from "../../../redux/actions/appActions";
import { useDispatch } from "react-redux";
import { showSnack } from "../../../redux/actions/appActions";

export default function CreateTask() {
    const rest = new RestApi();
    const dispatch = useDispatch();

    const handleClick = () => {
        rest.createTasks().then(() => {
           dispatch(setMessage({name: "Задачи успешно созданы!", status: "success"}));
           dispatch(showSnack(true));
        });
    }

    const buttonObj = {
        name: "Создать задачи в Битрикс 24",
        handleClick
    };
    return (
        <CustomButton props={{buttonObj}}></CustomButton>
    );
}