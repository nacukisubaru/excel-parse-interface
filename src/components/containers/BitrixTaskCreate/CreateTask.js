import React from "react";
import RestApi from "../../../api/restApi";
import ToolsTasks from "../../ToolsCreateTasks/ToolsTasks";
import { useDispatch } from "react-redux";
import { useShowMessage, useTogglePreloader } from "../../../hooks/appHooks";
import { setPortalsList, setGroup, setPortal, setGroupList } from "../../../redux/actions/bitrixActions";
import { useCallback, useEffect } from "react";
import { useCreateTasks } from "../../../hooks/tasksHooks";
import { setMessage } from "../../../redux/actions/appActions";
import { showSnack } from "../../../redux/actions/appActions";
import { togglePreloader } from "../../../redux/actions/appActions";

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
        dispatch(togglePreloader(true));
        rest.getBitrixPortalsList().then((portals) => {
            if (portals.status === 201) {
                dispatch(setPortalsList(portals.data));
                return false;
            }

            dispatch(setMessage({name: portals.statusText, status:"error"}));
            dispatch(showSnack(true));
        });
        dispatch(togglePreloader(false));
    }, [dispatch]);

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
                dispatch(setGroupList(response.data));
            } else {
                message.show(response.statusText, "error");
            }

            preloader.toggle(false);
        });
    };

    const portalsList = bitrixTasks.manager.portalsList.map((portal) => {
        return { id: portal.id, name: portal.url };
    });

    const groupsList = bitrixTasks.manager.groupsList.map((group) => {
        return { id: group.id, name: group.groupName };
    });

    let isActiveSelectGroup = bitrixTasks.manager.groupsList.length > 0 ? true : false;

    return (
        <div>
            <ToolsTasks props={{
                createTaskBtn:{
                    name: "?????????????? ???????????? ?? ?????????????? 24",
                    handleClick,
                },
                selectPortal: {
                    items: portalsList,
                    selectedValue: bitrixTasks.manager.portalId,
                    labelValue: "?????????????? ??????????????24",
                    isActive: true,
                    handleChange: handleChangePortals,
                },
                selectGroup: {
                    items: groupsList,
                    selectedValue: bitrixTasks.manager.groupId,
                    labelValue: "?????????????? ??????????????24",
                    isActive: isActiveSelectGroup,
                    handleChange: handleChangeGroups,
                }
            }}></ToolsTasks>
        </div>
    );
}
