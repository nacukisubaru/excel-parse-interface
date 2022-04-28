import { useShowMessage, useTogglePreloader } from "./appHooks";
import { useSelector } from "react-redux";
import RestApi from "../api/restApi";

export const useCreateTasks = () => {
    const message = useShowMessage();
    const preloader = useTogglePreloader();
    const manager = useSelector((state) => state.bitrixManager);
    const excelManager = useSelector((state) => state.excelManager);
    const rest = new RestApi();

    const create = async () => {
        preloader.toggle(true);
        if (excelManager.excelData.length <= 0) {
            message.show(
                "Файл xlsx не был загружен! Загрузите excel файл перед созданием задач.",
                "error"
            );
        } else if(manager.portalId === 0) {
            message.show(
                "Портал не выбран! Выберите портал перед созданием задач.",
                "error"
            );
        } else if(manager.groupId === 0) {
            message.show("Группа не выбрана! Выберете портал и группу перед созданием задач.", "error");
        } else {
            await rest.createTasks(manager.portalId, manager.groupId, excelManager.excelData).then(() => {
                message.show("Задачи успешно созданы!", "success");
            });
        }

        preloader.toggle(false);
    }

    return {
        create,
        manager
    }
}