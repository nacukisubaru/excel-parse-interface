import React from "react";
import RestApi from "../../../api/restApi";
import ToolsTasks from "../../ToolsCreateTasks/ToolsTasks";
import { useDispatch } from "react-redux";
import { useShowMessage, useTogglePreloader } from "../../../hooks/appHooks";
import { setPortalsList, setGroup, setPortal, setGroupList } from "../../../redux/actions/bitrixActions";
import { useCallback, useEffect } from "react";
import { useCreateTasks } from "../../../hooks/tasksHooks";

export default function CreateTask() {
   
    const message = useShowMessage();
    const preloader = useTogglePreloader();
    const bitrixTasks = useCreateTasks();
    const dispatch = useDispatch();

    const handleClick = async () => {
        bitrixTasks.create();
    };

    const projectsList = useCallback(() => {
        const rest = new RestApi();
        rest.getBitrixPortalsList("").then((portals) => {
            if (portals.status === 201) {
                dispatch(setPortalsList(portals.data));
                return false;
            }
            message.show(portals.statusText, "error");
        });
    }, [dispatch, message]);

    useEffect(() => {
        projectsList();
    }, [projectsList]);

    const handleChangeGroups = (event) => {
        preloader.toggle(true);
        dispatch(setGroup(event.target.value));
        preloader.toggle(false);
    };

    const handleChangePortals = (event) => {
        const rest = new RestApi();
        preloader.toggle(true);
        dispatch(setPortal(event.target.value));

        rest.getBitrixGroupsList(event.target.value).then((response) => {
            if (response.status === 201) {
                dispatch(setGroupList(response.data.result));
            } else {
                message.show(response.statusText, "error");
            }

            preloader.toggle(false);
        });
    };

    const portalsList = bitrixTasks.manager.portalsList.map((portal) => {
        return { id: portal.idPortal, name: portal.url };
    });

    const groupsList = bitrixTasks.manager.groupsList.map((group) => {
        return { id: group.ID, name: group.NAME };
    });

    let isActiveSelectGroup = bitrixTasks.manager.groupsList.length > 0 ? true : false;

    return (
        <div>
            <ToolsTasks props={{
                createTaskBtn:{
                    name: "Создать задачи в Битрикс 24",
                    handleClick,
                },
                selectPortal: {
                    items: portalsList,
                    selectedValue: bitrixTasks.manager.portalId,
                    labelValue: "Порталы Битрикс24",
                    isActive: true,
                    handleChange: handleChangePortals,
                },
                selectGroup: {
                    items: groupsList,
                    selectedValue: bitrixTasks.manager.groupId,
                    labelValue: "Проекты Битрикс24",
                    isActive: isActiveSelectGroup,
                    handleChange: handleChangeGroups,
                }
            }}></ToolsTasks>
        </div>
    );
}
