import {User} from "../model/user";
import request = require("request");

export class ApiClient {

    public static getUsers(callback: (error, users: User[]) => void): void {
        const url: string = "http://localhost:3000/users";
        const requestCallback = (error, response, body) => {
            if (error) {
                callback(error, null);

            } else if (response.statusCode !== 200) {
                callback(body, null);

            } else {
                const users: User[] = JSON.parse(body);
                callback(null, users);
            }
        };

        request.get(url, null, requestCallback);
    }

    public static postUser(
        name: string,
        password: string,
        callback: (error, msg: string) => void
    ) {
        const url: string = "http://localhost:3000/users";
        const options: request.CoreOptions = {
            json: {
                name: name,
                password: password
            }
        };
        const requestCallback = (error, response, body) => {
            if (error) {
                callback(error, null);

            } else if (response.statusCode !== 201) {
                callback(null, body);

            } else {
                callback(null, body);
            }
        };

        request.post(url, options, requestCallback);
    }
}