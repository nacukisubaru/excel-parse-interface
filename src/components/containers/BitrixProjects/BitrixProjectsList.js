import React from "react";
import RestApi from "../../../api/restApi";
import SelectList from "../../SelectList/SelectList";
import { useEffect, useCallback } from "react";
import { setProjectList } from "../../../redux/actions/bitrixActions";
import { useDispatch, useSelector } from "react-redux";
import { setProject } from "../../../redux/actions/bitrixActions";

export default function BitrixProjectsList() {
   
    const dispatch = useDispatch();
    const bitrixManager = useSelector((state) => state.bitrixManager);
    
    const projectsList = useCallback(() => {
        const rest = new RestApi();
        rest.getBitrixProjectsList().then((response) => {
            dispatch(setProjectList(response));
        });
    }, [dispatch])


    useEffect(() => {
        projectsList();
    }, [projectsList]);

    const handleChange = (event) => {
        dispatch(
            setProject(event.target.value)
        );
    };

    const selectObj = {
        items: bitrixManager.projectList,
        selectedValue: bitrixManager.project,
        labelValue: 'Проекты Битрикс24',
        handleChange,
    };

    return (
        <div>
            <SelectList props={{ selectObj }}></SelectList>
        </div>
    );
}
