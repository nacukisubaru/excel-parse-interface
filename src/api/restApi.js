const axios = require("axios");

export default class RestApi {
    constructor() {
        this.statusPostOk = 201;
        this.statusGetOk = 200;
        this.statusInternalError = 500;
        this.statusBadRequest = 400;
        this.statusUnAuthorized = 401;

        this.url = "https://project-sync.uniqtripsoft.ru";
        this.headers =  {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
    }

    sendRequest = async (
        method = "post",
        action,
        data = null,
        isSendFile = false,
    ) => {
        let result = {};

        const axiosObj = {
            method: method,
            url: this.url + action,
        };
  
        if(isSendFile) {
            axiosObj.headers = {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
            };
        } else {
            axiosObj.headers = this.headers;
        }

        if (data != null) {
            axiosObj.data = data;
        }

        await axios(axiosObj)
            .then(function (response) {
                result = response;
            })
            .catch(function (error) {
                result = error.response;
            });
        return result;
    };

    getBitrixGroupsList = async (portalId) => {
        let response = await this.sendRequest(
            "post",
            "/bitrix/group/getGroupList",
            { portalId }
        );

        if (response.status === this.statusInternalError) {
            return {
                statusText: "Ошибка сервера при получении групп.",
                status: this.statusInternalError,
            };
        }
        return response;
    };

    getBitrixPortalsList = async () => {
        let response = await this.sendRequest(
            "post",
            "/bitrix/portals/getList/",
        );
        
        if (response.status === this.statusInternalError) {
            return {
                statusText: "Ошибка сервера при получении порталов.",
                status: this.statusInternalError,
            };
        }
        return response;
    };

    sendFile = async (data) => {
        let response = await this.sendRequest(
            "post",
            "/files/upload/",
            data,
            true
        );

        if (
            response.data === "Ошибка при загрузке файла." ||
            response.status === this.statusInternalError
        ) {
            return {
                statusText: "Ошибка при загрузке файла.",
                status: this.statusInternalError,
            };
        }
        return response;
    };

    createTasks = async (portalId, groupId, data) => {
        let response = await this.sendRequest(
            "post",
            "/bitrix/synchronization/importTasksFromArrFile",
            {portalId, groupId, data}
        );

        if (response.status !== this.statusPostOk) {
            return {
                statusText: "Ошибка на сервере при создании задач.",
                status: this.statusInternalError,
            };
        }

        return response;
    };
}
