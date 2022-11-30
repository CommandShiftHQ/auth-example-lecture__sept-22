const usersInDatabase = [
  {
    username: "Ben",
    email: "ben.s@builtbypixel.com",
    // password: "examplepassword"
    password: "$2a$10$R8sKZWob4B7K9RuvBh5RD.2D5aIonCGkR8uUgET6rzBZ4HH.hP0M."
  }, 
  {
    username: "Dave",
    email: "itsame@mario.com",
    // password: "ice_cream_please"
    password: "$2a$10$7l83gmqfjgCMkyqukvjqe.sqUJQDXv.fUqb7DsFQ5td1yWWIPH5Cq"
  },
  {
    username: "testUser",
    email: "test@email.com",
    // password: "test123"
    password: "$2a$10$KM4DkEaz2Ofwf08NAbRffueKWXfnVXibL/iowOk0g6WVk5qYqw7bO"
  }
];

const getUserLogin = async (details) => {
  
  const isValidUser = await usersInDatabase.find((user) =>
      user.username === details.username &&
      user.email === details.email
  );

  return isValidUser ? isValidUser : { error: "login details do not exist in db" };
};

module.exports = { getUserLogin }