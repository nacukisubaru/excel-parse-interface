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

        this.taskArray = [
            {
                NAME: 'Задача 1',
                ITEMS: [
                    {
                        NAME: 'Задача 1 Подзадача 1',
                        ITEMS: [
                            {NAME: 'Задача 1 Подзадача 1 Подзадача 1'},
                            {NAME: 'Задача 1 Подзадача 1 Подзадача 2'},
                            {
                                NAME: 'Задача 1 Подзадача 1 Подзадача 3', 
                                ITEMS: [
                                    {NAME: 'Задача 1 Подзадача 1 Подзадача 3 Подзадача 1'},
                                ]
                            }
                        ]
                    },
                    {
                        NAME: 'Задача 1 Подзадача 2',
                        ITEMS: [
                            {NAME: 'Задача 1 Подзадача 2 Подзадача 1'},
                            {NAME: 'Задача 1 Подзадача 2 Подзадача 2'},
                            {
                                NAME: 'Задача 1 Подзадача 2 Подзадача 3', 
                                ITEMS: [
                                    {NAME: 'Задача 1 Подзадача 2 Подзадача 3 Подзадача 1'},
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                NAME: 'Задача 2',
                ITEMS: [
                    {
                        NAME: 'Задача 2 Подзадача 1',
                        ITEMS: [
                            {NAME: 'Задача 2 Подзадача 1 Подзадача 1'},
                            {NAME: 'Задача 2 Подзадача 1 Подзадача 2'},
                            {
                                NAME: 'Задача 2 Подзадача 1 Подзадача 3', 
                                ITEMS: [
                                    {NAME: 'Задача 2 Подзадача 1 Подзадача 3 Подзадача 1'},
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }

    sendRequest = async (method, action, data = null) => {
         let result = {};
         let that = this;

        await axios.post(this.url + action, {data})
            .then(function (response) {
                response = that.taskArray;
                result = response;
            })
            .catch(function (error) {
                result = error.response;
            });
        return result;
    };

}
