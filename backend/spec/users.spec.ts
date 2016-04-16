import ApiClient from "./api-client";
import User from "../model/user";

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

describe("POST /users", () => {
    it("returns \"Created\" keyword if user did not exist and creates it", (done) => {
        ApiClient.postUser("Wolverine", "wolvie123", (err, body: string) => {
            expect(err).toBeNull();
            expect(body).toEqual("Created");
            done();
        });
    });

    it("returns \"User already exists\" message if creating an already existing user", (done) => {
        ApiClient.postUser("Wolverine", "wolvie123", (err, body: string) => {
            expect(err).toBeNull();
            expect(body).toEqual("User already exists");
            done();
        });
    });

    it("returns \"Missing user name\" message if name is sent idle", (done) => {
        ApiClient.postUser("", "wolvie123", (err, body: string) => {
            expect(err).toBeNull();
            expect(body).toEqual("Missing user name");
            done();
        });
    });

    it("returns \"Missing user password\" message if password is sent idle", (done) => {
        ApiClient.postUser("Wolverine", "", (err, body: string) => {
            expect(err).toBeNull();
            expect(body).toEqual("Missing user password");
            done();
        });
    });
});

describe("GET /users/name", () => {
    it("returns error 404 if name do not exists", (done) => {
        ApiClient.getUser("Ironman", (err, user: User) => {
            expect(err).toEqual("Not Found");
            expect(user).toBeNull();
            done();
        });
    });

    it("returns an user entitiy if name exists", (done) => {
        ApiClient.getUser("Spiderman", (err, user: User) => {
            expect(err).toBeNull();
            expect(user.name).toEqual("Spiderman");
            done();
        });
    });

    it("returns an user entitiy with his stats at 0 if just created", (done) => {
        ApiClient.postUser("Hulk", "hulk1960", (err, msg) => {
            ApiClient.getUser("Hulk", (err, user: User) => {
                expect(err).toBeNull();
                expect(user.name).toEqual("Hulk");
                expect(user.winnings).toEqual(0);
                expect(user.played).toEqual(0);
                done();
            });
        });
    });

    it("increase by one both players' counters if they finish a game between each other", (done) => {
        let previouslyPlayedByBatman: number;
        let previouslyWonByBatman: number;

        let previouslyPlayedByWolverine: number;
        let previouslyWonByWolverine: number;

        ApiClient.getUser("Batman", (err, batman: User) => {
            previouslyPlayedByBatman = batman.played;
            previouslyWonByBatman = batman.winnings;

            ApiClient.getUser("Wolverine", (err, wolverine: User) => {
                previouslyPlayedByWolverine = wolverine.played;
                previouslyWonByWolverine = wolverine.winnings;

                ApiClient.startGame("Batman", "Wolverine", (err, res) => {
                    expect(res).toEqual("Created");
                    ApiClient.move("Batman", "Wolverine", 0, (err, res) => {
                        ApiClient.move("Batman", "Wolverine", 1, (err, res) => {
                            ApiClient.move("Batman", "Wolverine", 3, (err, res) => {
                                ApiClient.move("Batman", "Wolverine", 4, (err, res) => {
                                    ApiClient.move("Batman", "Wolverine", 6, (err, res) => {
                                        expect(res).toEqual("You win!");

                                        ApiClient.getUser("Batman", (err, batman: User) => {
                                            expect(batman.played).toEqual(previouslyPlayedByBatman + 1);
                                            expect(batman.winnings).toEqual(previouslyWonByBatman + 1);

                                            ApiClient.getUser("Wolverine", (err, wolverine: User) => {
                                                expect(wolverine.played).toEqual(previouslyPlayedByWolverine + 1);
                                                expect(wolverine.winnings).toEqual(previouslyWonByWolverine);
                                                done();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
