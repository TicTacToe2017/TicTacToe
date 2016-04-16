import User from "../model/user";
import Game from "../model/game";
import * as request from "request";

export default class ApiClient {

    // TODO: make ApiClient to return promises instead of using callbacks

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

    public static getUser(
        name: string,
        callback: (error, user: User) => void
    ): void {
        const url: string = `http://localhost:3000/users/${name}`;
        const requestCallback = (error, response, body) => {
            if (error) {
                callback(error, null);

            } else if (response.statusCode !== 200) {
                callback(body, null);

            } else {
                const user: User = JSON.parse(body);
                callback(null, user);
            }
        };

        request.get(url, null, requestCallback);
    }

    public static getGamesForUser(
        name: string,
        callback: (error, games: Game[]) => void
    ): void {
        const url: string = `http://localhost:3000/games/${name}`;
        const requestCallback = (error, response, body) => {
            if (error) {
                callback(error, null);

            } else if (response.statusCode !== 200) {
                callback(body, null);

            } else {
                const games: Game[] = JSON.parse(body);
                callback(null, games);
            }
        };

        request.get(url, null, requestCallback);
    }

    public static startGame(
        name_player_x: string,
        name_player_o: string,
        callback: (error, res) => void
    ): void {
        const url: string = `http://localhost:3000/games/${name_player_x}/${name_player_o}`;
        const requestCallback = (error, response, body) => {
            if (error) {
                callback(error, null);

            } else if (response.statusCode !== 201) {
                callback(body, null);

            } else {
                callback(null, body);
            }
        };

        request.post(url, null, requestCallback);
    }

    public static getGame(
        name_player_x: string,
        name_player_o: string,
        callback: (error, game: Game) => void
    ): void {
        const url: string = `http://localhost:3000/games/${name_player_x}/${name_player_o}`;
        const requestCallback = (error, response, body) => {
            if (error) {
                callback(error, null);

            } else if (response.statusCode !== 200) {
                callback(body, null);

            } else {
                const game: Game = JSON.parse(body);
                callback(null, game);
            }
        };

        request.get(url, null, requestCallback);
    }

    public static move(
        name_player_x: string,
        name_player_o: string,
        tileNumber: number,
        callback: (error, res) => void
    ): void {
        const url: string = `http://localhost:3000/games/${name_player_x}/${name_player_o}?tile=${tileNumber}`;
        const requestCallback = (error, response, body) => {
            if (error) {
                callback(error, null);

            } else if (response.statusCode !== 201) {
                callback(body, null);

            } else {
                callback(null, body);
            }
        };

        request.put(url, null, requestCallback);
    }

}