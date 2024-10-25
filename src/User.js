// Making a user class
class User {
  // Using the constructor gives parameters for the user
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }
  // Function for logging in and using password
  login(password) {
    if (password === this.password) {
      // Checking the password is equal the password
      this.loggedIn = true;
      console.log(`${this.username} logged in`); // Console Logging the user that is logged in
    } else {
      throw new Error("Incorrect password"); // Throwing an error for incorrect password
    }
  }

  logout() {
    this.loggedIn = false;
    console.log(`${this.username} logged out`); // Loggin the user out and logging it to console.
  }
}
//Exporting it to be referenced in the tests
module.exports = User;
