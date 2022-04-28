import React from "react";
import RestApi from "../../../api/restApi";
import SelectList from "../../SelectList/SelectList";
import { useEffect, useCallback } from "react";
import { setGroupList } from "../../../redux/actions/bitrixActions";
import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../../../redux/actions/bitrixActions";
import { setPortalsList } from "../../../redux/actions/bitrixActions";
import { useShowMessage } from "../../../hooks/appHooks";
import { setPortal } from "../../../redux/actions/bitrixActions";

export default function BitrixProjectsList() {
    const dispatch = useDispatch();
    const bitrixManager = useSelector((state) => state.bitrixManager);
    const message = useShowMessage();

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

    return (
        <div>
            <SelectList
                props={{
                    items: portalsList,
                    selectedValue: bitrixManager.portalId,
                    labelValue: "Порталы Битрикс24",
                    handleChange: handleChangePortals,
                }}
            ></SelectList>
            {bitrixManager.groupsList.length > 0 && (
                <SelectList
                    props={{
                        items: groupsList,
                        selectedValue: bitrixManager.projectId,
                        labelValue: "Проекты Битрикс24",
                        handleChange: handleChangeGroups,
                    }}
                ></SelectList>
            )}
        </div>
    );
}
