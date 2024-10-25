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
    // Get the registered user by username
    const user = this.registeredUsers[username];
    if (!user || !user.login(password)) {
      throw new Error("Username or password is incorrect");
    }
    console.log(`User ${username} logged in successfully.`);
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user || !user.loggedIn) {
      throw new Error("No such user is logged in");
    }
    user.loggedIn = false; // Set user to logged out
    console.log(`${username} logged out successfully.`);
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
    // Check if the station exists
    if (!this.stations[station]) {
      throw new Error("No such station");
    }
    // Check if the scooter is already docked at the specified station
    if (scooter.station === station) {
      throw new Error("Scooter already at station");
    }

    // If the scooter has a current station, remove it from that station's array
    if (scooter.station) {
      const currentStation = this.stations[scooter.station];
      const scooterIndex = currentStation.indexOf(scooter);
      if (scooterIndex !== -1) {
        currentStation.splice(scooterIndex, 1); // Remove from the current station
      }
    }

    // Dock the scooter at the new station
    scooter.dock(station);
    this.stations[station].push(scooter); // Add to the new station's array
    console.log(`Scooter docked at ${station}.`);
  }

  rentScooter(scooter, user) {
    // Check if the user is logged in
    if (!user.loggedIn) {
      throw new Error("User must be logged in to rent a scooter");
    }
    // Check if the scooter is available
    const station = this.stations[scooter.station];
    const scooterIndex = station.indexOf(scooter);

    if (scooterIndex === -1) {
      throw new Error("Scooter not available at the station");
    }

    // Rent the scooter
    scooter.rent(user); // Assuming this sets scooter.user
    station.splice(scooterIndex, 1); // Remove the scooter from the station's list
    console.log(`${user.username} rented a scooter from ${scooter.station}.`);
  }

  print() {
    console.log("Registered Users:");
    for (const user of Object.values(this.registeredUsers)) {
      console.log(user.username); // Print each username individually
    }
    console.log("Stations and Scooter Count:");
    for (const station in this.stations) {
      console.log(`${station}: ${this.stations[station].length} scooters`);
    }
  }
}

module.exports = ScooterApp;
