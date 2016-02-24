import {ApiClient} from "./api-client";
import {User} from "../model/user";

describe("GET /users", () => {
    it("returns an array with all users", (done) => {
        ApiClient.getUsers((err, users: User[]) => {
            expect(err).toBeNull();
            expect(users.length).toEqual(3);
            expect(users[0].name).toEqual("Spiderman");
            expect(users[1].name).toEqual("Batman");
            expect(users[2].name).toEqual("Daredevil");
            done();
        });
    });
});