// Making a user class
class User {
  constructor(username, password, age) {
    this.username = username;
    this.password = password; // Store the password securely in a real app
    this.age = age;
    this.loggedIn = false;
  }

  login(password) {
    if (this.password !== password) {
      throw new Error("Incorrect password"); // Ensure an error is thrown for wrong password
    }
    this.loggedIn = true; // Set loggedIn to true if the password is correct
    return this.loggedIn;
  }

  logout() {
    if (!this.loggedIn) {
      throw new Error("User not logged in");
    }
    this.loggedIn = false; // Set loggedIn to false when logging out
  }
}

//Exporting it to be referenced in the tests
module.exports = User;
