# Authorisation and Authentication demo for FE module

## Before you start...

**Please don't make direct changes to this repo.**  
Fork the repo first. Danke!

## The Repo

- The `step-01__start` branch is your jumping off point.  
- A simple React app has been created consisting of `home`, `account` and `login` pages.
- A small `express` backend is also included, to mimic making calls to a remote DB.
- Users can log in using their username, email address and password.
  These can be found in the mock database (`server/db/queries.js`).


## The Challenge

Passwords are stored as plain strings in our mock database. This is a security concern!  
- We'll fix this by replacing the passwords in the database with hashes produced from the users' passwords.  
- We'll use [bcryptjs](https://www.npmjs.com/package/bcryptjs) to validate user login requests.


Refreshing the webpage logs the user out.
- We'll use a JSON Web Token (JWT) to validate the user's requests to the server. 
- We'll store the JWT in a cookie. this will be stored on the user's local device rather than in state. it can be used to keep the user logged in, even if the browser is refreshed.
- We'll also create a logout method that deletes the cookie and ends the user's session.

## Packages Used

- dotenv
- jsonwebtoken
- jwt-decode
- js-cookie
- react test renderer
- bcryptjs

These are already installed.

## Installation and checking out branches

### Installation

- Some of the dependencies in this repo require a Node.js version between 16.0.0 & 17.0.0.  
  Check your node version with `node -v`.  
  You can set your node version to 16.0.0 using `nvm i 16.0.0` followed by `nvm use 16.0.0`.

- Clone down this repo and run `npm run install-deps` to install the dependencies for the `client` and `server` folders.

- Create a `.env` file in the `server` directory and enter a value for `jwtSecret`. The value can be any string.
  ```
  jwtSecret=secret
  ```

- Then run `npm run dev` to start the application. 

- Checkout the `step-01__start` branch to try and create the solution yourself, or checkout the relevant solution branch to see an implementation.

### Checking out branches

To checkout a branch that you do not have locally but is present on the remote repository, use `git checkout -t origin/branchname`. Once you have the branches stored locally use `git switch branchname`.

### Branches

There are 4 branches. Each represents a step from the lecture demonstration.

- `step-01__start`  
  This is the starting point, consisting of the basic app as described at the top of this file.

- `step-02__bcrypt-demo`  
  This branch demonstrates the use of bcrypt to hash a string.  
  An input in the login page takes a string, which is then hashed and displayed on the page.

- `step-03__bcrypt-backend`  
  In this branch the plain text passwords in the database have been replaced with hashes.  
  On login, the user's username and email address are validated in the same way as before.  
  However bcrypt is now used to validate the password against the hash from the database.

- `step-04__jwts-and-cookies`  
  In this branch, once the user's login credentials have been verified the server returns a JWT bundled in a cookie.  
  This is automatically stored on the client's device by the browser.  
  The frontend app can then access this cookie to persist the user's login session.

- `step-05__logout`  
  In this branch we update the logout button's onClick method to delete the cookie, allowing the user to log out.


## Available scripts in the root of the project

- `npm run install-deps`
- `npm run dev` to run the client and server at the same time
- `npm run client`
- `npm run server`
