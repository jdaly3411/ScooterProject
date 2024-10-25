// src/ScooterApp.js

const Scooter = require("./Scooter");
const User = require("./User");

class ScooterApp {
  constructor() {
    // Initialize the stations and registered users
    this.stations = {
      Downtown: [],
      Uptown: [],
      MidCity: [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    // Check if the user is already registered and if they are old enough
    if (this.registeredUsers[username]) {
      throw new Error("User already registered");
    }
    if (age < 18) {
      throw new Error("User too young to register");
    }

    // Create and register the new user
    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log(`User ${username} registered successfully.`);
    return user;
  }

  loginUser(username, password) {
    // get the registered user by username
    const user = this.registeredUsers[username];
    if (!user || !user.login(password)) {
      throw new Error("Username or password is incorrect");
    }
    console.log(`User ${username} logged in successfully.`);
  }

  logoutUser(username) {
    // get the registered user and log them out
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("No such user is logged in");
    }
    user.logout();
    console.log(`User ${username} logged out successfully.`);
  }

  createScooter(station) {
    // Check if the station exists
    if (!this.stations[station]) {
      throw new Error("No such station");
    }

    // Create a new scooter and add it to the station's scooter list
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log(`Created new scooter at ${station}.`);
    return scooter;
  }

  dockScooter(scooter, station) {
    // Check if the station exists and the scooter is not already docked
    if (!this.stations[station]) {
      throw new Error("No such station");
    }
    if (scooter.station === station) {
      throw new Error("Scooter already at station");
    }

    // Dock the scooter
    scooter.dock(station);
    this.stations[station].push(scooter);
    console.log(`Scooter docked at ${station}.`);
  }

  rentScooter(scooter, user) {
    // Check if the scooter is available to rent
    const stationScooters = this.stations[scooter.station];
    if (!stationScooters || !stationScooters.includes(scooter)) {
      throw new Error("Scooter not available at station");
    }

    // Rent the scooter to the user
    scooter.rent(user);
    console.log(`Scooter rented to ${user.username}.`);
  }

  print() {
    // Log the list of registered users
    console.log("Registered Users:");
    console.log(Object.keys(this.registeredUsers));

    // Log the stations and the number of scooters at each station
    console.log("Stations and Scooter Count:");
    for (const station in this.stations) {
      console.log(`${station}: ${this.stations[station].length} scooters`);
    }
  }
}

module.exports = ScooterApp;
