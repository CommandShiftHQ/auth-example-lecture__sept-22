const usersInDatabase = [
  {
      username: "Ben",
      email: "ben.s@builtbypixel.com",
      password: "examplepassword"
  }, 
  {
    username: "Dave",
    email: "itsame@mario.com",
    password: "ice_cream_please"
  },
  {
      username: "testUser",
      email: "test@email.com",
      password: "test123"
  },
];

const getUserLogin = async (details) => {
  
  const isValidUser = await usersInDatabase.find((user) =>
      user.username === details.username &&
      user.email === details.email &&
      user.password === details.password
  );

  return isValidUser ? true : { error: "login details do not exist in db" };
};

module.exports = { getUserLogin }