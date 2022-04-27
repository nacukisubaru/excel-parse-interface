const axios = require("axios");

export default class RestApi {
    constructor() {
        this.statusPostOk = 201;
        this.statusGetOk = 200;
        this.statusInternalError = 500;
        this.statusBadRequest = 400;
        this.statusUnAuthorized = 401;

        this.url = "https://project-sync.uniqtripsoft.ru";
        this.headers = {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
        };


        this.projectsListMock = [
            { id: 15742, name: "My best project" },
            { id: 15748, name: "My best project2" },
            { id: 15412, name: "My best project3" },
        ];
    }

    sendRequest = async (method = "post", action, mock = "tasks", data = null) => {
        let result = {};
        let that = this;

        const axiosObj = {
            method: method,
            url: this.url + action,
            headers: this.headers,
        };

        if (data != null) {
            axiosObj.data = data;
        }

        await axios(axiosObj)
            .then(function (response) {
                if (mock === "projects") {
                    response = that.projectsListMock;
                } else if (mock === "createTask") {
                    response = {status: "success"};
                }
                result = response;
            })
            .catch(function (error) {
                result = error.response;

                if(error.response.status === that.statusInternalError) {
                    result = {statusText: 'Ошибка при загрузке файла.', status: that.statusInternalError};
                }

                if (mock === "projects") {
                    result = that.projectsListMock;
                } else if (mock === "createTask") {
                    result = {status: "success"};
                }
            });
        return result;
    };

    getBitrixProjectsList = async () => {
       let response = await this.sendRequest("get", "/users", "projects");
       return response;
    };

    sendFile = async (data) => {
        let response = await this.sendRequest("post", "/files/upload/", "tasks", data);
        if(response.data === 'Ошибка при загрузке файла.') {
            return {statusText: 'Ошибка при загрузке файла.', status: this.statusInternalError};
        }
        return response;
    };

    createTasks = async (data) => {
        let response = await this.sendRequest("post", "/users", "createTask", data);
        return response;
    }
}
