import React from "react";
import RestApi from "../../../api/restApi";
import ToolsTasks from "../../ToolsCreateTasks/ToolsTasks";
import { useSelector, useDispatch } from "react-redux";
import { useShowMessage, useTogglePreloader } from "../../../hooks/appHooks";
import { setPortalsList, setGroup, setPortal, setGroupList } from "../../../redux/actions/bitrixActions";
import { useCallback, useEffect } from "react";

export default function CreateTask() {
    const rest = new RestApi();
    const message = useShowMessage();
    const preloader = useTogglePreloader();
    const dispatch = useDispatch();
    const bitrixManager = useSelector((state) => state.bitrixManager);
    const excelManager = useSelector((state) => state.excelManager);

    const handleClick = async () => {
        preloader.toggle(true);
        if (excelManager.excelData.length > 0) {
            await rest.createTasks(excelManager.excelData).then(() => {
                message.show("Задачи успешно созданы!", "success");
            });
        } else {
            message.show(
                "Файл xlsx не был загружен! Загрузите excel файл перед созданием задач",
                "error"
            );
        }
        preloader.toggle(false);
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
    }, [dispatch]);

    useEffect(() => {
        projectsList();
    }, [projectsList]);

    const handleChangeGroups = (event) => {
        dispatch(setGroup(event.target.value));
    };

    const handleChangePortals = (event) => {
        const rest = new RestApi();

        dispatch(setPortal(event.target.value));

        rest.getBitrixGroupsList(event.target.value).then((response) => {
            if (response.status === 201) {
                dispatch(setGroupList(response.data.result));
                return false;
            }
            message.show(response.statusText, "error");
        });
    };

    const portalsList = bitrixManager.portalsList.map((portal) => {
        return { id: portal.idPortal, name: portal.url };
    });

    const groupsList = bitrixManager.groupsList.map((group) => {
        return { id: group.ID, name: group.NAME };
    });

    let isActiveSelectGroup = bitrixManager.groupsList.length > 0 ? true : false;

    return (
        <div>
            <ToolsTasks props={{
                createTaskBtn:{
                    name: "Создать задачи в Битрикс 24",
                    handleClick,
                },
                selectPortal: {
                    items: portalsList,
                    selectedValue: bitrixManager.portalId,
                    labelValue: "Порталы Битрикс24",
                    isActive: true,
                    handleChange: handleChangePortals,
                },
                selectGroup: {
                    items: groupsList,
                    selectedValue: bitrixManager.projectId,
                    labelValue: "Проекты Битрикс24",
                    isActive: isActiveSelectGroup,
                    handleChange: handleChangeGroups,
                }
            }}></ToolsTasks>
        </div>
    );
}
