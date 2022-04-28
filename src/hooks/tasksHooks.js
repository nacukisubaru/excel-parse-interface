import RestApi from "../api/restApi";
import { useShowMessage, useTogglePreloader } from "./appHooks";
import { useDispatch, useSelector } from "react-redux";

export const useInitHooks = () => {
    const dispatch = useDispatch();
    const message = useShowMessage();
    const preloader = useTogglePreloader();
    const bitrixManager = useSelector((state) => state.bitrixManager);
    const excelManager = useSelector((state) => state.excelManager);
    const rest = new RestApi();

    return {
        dispatch,
        bitrixManager,
        excelManager,
        preloader,
        message,
        rest
    }
}

export const useCreateTasks = () => {
    const hooksManager = useInitHooks();

    const create = async () => {
        hooksManager.preloader.toggle(true);
        if (hooksManager.excelManager.excelData.length <= 0) {
            hooksManager.message.show(
                "Файл xlsx не был загружен! Загрузите excel файл перед созданием задач.",
                "error"
            );
        } else if(hooksManager.bitrixManager.portalId === 0) {
            hooksManager.message.show(
                "Портал не выбран! Выберите портал перед созданием задач.",
                "error"
            );
        } else if(hooksManager.bitrixManager.groupId === 0) {
            hooksManager.message.show("Группа не выбрана! Выберете портал и группу перед созданием задач.", "error");
        } else {
            await hooksManager.rest.createTasks(hooksManager.bitrixManager.portalId, hooksManager.bitrixManager.groupId, hooksManager.excelManager.excelData).then((response) => {
                if(response.status === 201 && response.data.result === "success") {
                    hooksManager.message.show("Задачи успешно созданы!", "success");
                } else {
                    hooksManager.message.show(response.statusText, "error");
                }
            });
        }

        hooksManager.preloader.toggle(false);
    }

    return {
        create,
        manager: hooksManager.bitrixManager
    }
}