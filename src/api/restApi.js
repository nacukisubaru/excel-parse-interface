const axios = require("axios");

export default class RestApi {
    constructor() {
        this.statusPostOk = 201;
        this.statusGetOk = 200;
        this.statusInternalError = 500;
        this.statusBadRequest = 400;
        this.statusUnAuthorized = 401;

        this.url = "https://jsonplaceholder.typicode.com";
        this.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        this.taskArrayMock = [
            {
                TITLE: 'Задача 1',
                ITEMS: [
                    {
                        TITLE: 'Задача 1 Подзадача 1',
                        ITEMS: [
                            {TITLE: 'Задача 1 Подзадача 1 Подзадача 1'},
                            {TITLE: 'Задача 1 Подзадача 1 Подзадача 2'},
                            {
                                TITLE: 'Задача 1 Подзадача 1 Подзадача 3', 
                                ITEMS: [
                                    {TITLE: 'Задача 1 Подзадача 1 Подзадача 3 Подзадача 1'},
                                ]
                            }
                        ]
                    },
                    {
                        TITLE: 'Задача 1 Подзадача 2',
                        ITEMS: [
                            {TITLE: 'Задача 1 Подзадача 2 Подзадача 1'},
                            {TITLE: 'Задача 1 Подзадача 2 Подзадача 2'},
                            {
                                TITLE: 'Задача 1 Подзадача 2 Подзадача 3', 
                                ITEMS: [
                                    {TITLE: 'Задача 1 Подзадача 2 Подзадача 3 Подзадача 1'},
                                ]
                            }
                        ]
                    },
                    {
                        TITLE: 'Задача 1 Подзадача 3',
                        ITEMS: [
                            {TITLE: 'Задача 1 Подзадача 2 Подзадача 1'},
                            {TITLE: 'Задача 1 Подзадача 2 Подзадача 2'},
                            {
                                TITLE: 'Задача 1 Подзадача 2 Подзадача 3', 
                                ITEMS: [
                                    {TITLE: 'Задача 1 Подзадача 2 Подзадача 3 Подзадача 1'},
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                TITLE: 'Задача 2',
                ITEMS: [
                    {
                        TITLE: 'Задача 2 Подзадача 1',
                        ITEMS: [
                            {TITLE: 'Задача 2 Подзадача 1 Подзадача 1'},
                            {TITLE: 'Задача 2 Подзадача 1 Подзадача 2'},
                            {
                                TITLE: 'Задача 2 Подзадача 1 Подзадача 3', 
                                ITEMS: [
                                    {TITLE: 'Задача 2 Подзадача 1 Подзадача 3 Подзадача 1'},
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        this.projectsListMock = [
            { id: 15742, name: "My best project" },
            { id: 15748, name: "My best project2" },
            { id: 15412, name: "My best project3" },
        ];
    }

    sendRequest = async (method = "post", action, mock = "tasks", data = null) => {
        let result = {};
        let that = this;
        let request = axios;
        if(method === "post") {
            request = axios.post;
        } else if (method === "get") {
            request = axios.get;
        }

        await request(this.url + action, { data })
            .then(function (response) {
                let responseMock = "";
                if (mock === "tasks") {
                    responseMock = that.taskArrayMock;
                } else if (mock === "projects") {
                    responseMock = that.projectsListMock;
                } else if (mock === "createTask") {
                    responseMock = {status: "success"};
                }

                response = responseMock;
                result = response;
            })
            .catch(function (error) {
                result = error.response;
            });
        return result;
    };

    getBitrixProjectsList = async () => {
       let response = await this.sendRequest("get", "/users", "projects");
       return response;
    };

    sendFile = async (data) => {
        let response = await this.sendRequest("post", "/users", "tasks", data);
        return response;
    };

    createTasks = async (data) => {
        let response = await this.sendRequest("post", "/users", "createTask", data);
        return response;
    }
}
