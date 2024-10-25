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
    if (this.password === password) {
      this.loggedIn = true; // Set loggedIn to true upon successful login
      return true; // Return true if login is successful
    }
    return false; // Return false if login fails
  }

  logout() {
    this.loggedIn = false;
    console.log(`${this.username} logged out`); // Loggin the user out and logging it to console.
  }
}
//Exporting it to be referenced in the tests
module.exports = User;
