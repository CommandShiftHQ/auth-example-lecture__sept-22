const usersInDatabase = [
    {
        username: "Ben",
        email: "ben.s@builtbypixel.com",
        // password: examplepassword
        password: "$2y$10$lOqKJynxwTqwiKnlBz4q5utCy2l9QMvyCTvEbWaS7E3kdbcLsI60G",
    },
    {
        username: "testUser",
        email: "test@email.com",
        // password: examplepassword
        password: "$2y$10$5VrBIiUcVZJ7J88sfqQBJOEq2Ijalars.uV6nnlcezrBXwEF.p3BS",
    },
];

const getUserLogin = async (details) => {
    const isValidUser = await usersInDatabase.find((user) =>
        user.username === details.username &&
        user.email === details.email
    );

    return isValidUser ? isValidUser : { error: "login details do not exist in db" };
};

module.exports = { getUserLogin }