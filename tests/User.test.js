// User.test.js
// Import the user class from the user.js file
// Import the User class from the source file
const User = require("../src/User");

describe("User Class", () => {
  // Test  to check the initialization of User properties
  test("Should initialize User properties correctly", () => {
    const user = new User("johnDoe", "password", 20);
    expect(user.username).toBe("johnDoe");
    expect(user.password).toBe("password");
    expect(user.age).toBe(20);
    expect(user.loggedIn).toBe(false); // Initially, the user should not be logged in
  });

  // Test to test   user login with correct password
  test("Should log in user with correct password", () => {
    const user = new User("johnDoe", "password", 20);
    user.login("password"); // Attempt to log in with the correct password
    expect(user.loggedIn).toBe(true); // The user should be logged in now
  });

  // Test to test user login with incorrect password
  test("Should not log in user with incorrect password", () => {
    const user = new User("johnDoe", "password", 20);
    expect(() => user.login("wrongPassword")).toThrow("Incorrect password"); // Expect an error for wrong password
  });

  // Test to log out the user
  test("Should log out user", () => {
    const user = new User("johnDoe", "password", 20);
    user.login("password"); // Log in the user first
    user.logout(); // Now log out
    expect(user.loggedIn).toBe(false); // The user should be logged out
  });
});
