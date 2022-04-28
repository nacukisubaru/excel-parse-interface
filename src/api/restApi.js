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
        mock = "tasks",
        data = null,
        isSendFile = false,
    ) => {
        let result = {};
        let that = this;

        const axiosObj = {
            method: method,
            url: this.url + action,
        };
        console.log(isSendFile);
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
                if (mock === "createTask") {
                    response = { status: "success" };
                }
                result = response;
            })
            .catch(function (error) {
                result = error.response;
                if (mock === "projects") {
                    result = that.projectsListMock;
                } else if (mock === "createTask") {
                    result = { status: "success" };
                }
            });
        return result;
    };

    getBitrixGroupsList = async (portalId) => {
        let response = await this.sendRequest(
            "post",
            "/bitrix/group/getGroupList",
            "",
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

    getBitrixPortalsList = async (id) => {
        let response = await this.sendRequest(
            "post",
            "/bitrix/portals/getList/",
            "",
            { id }
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
            "tasks",
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
            "/users",
            "createTask",
            {portalId, groupId, data}
        );
        return response;
    };
}
