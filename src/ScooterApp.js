const Scooter = require("./Scooter");
const User = require("./User");

class ScooterApp {
  constructor() {
    this.stations = {
      Downtown: [],
      Uptown: [],
      Suburb: [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("User is already registered");
    } else if (age < 18) {
      throw new Error("User too young to register");
    }
    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log(`User ${username} registered`);
    return user;
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user) throw new Error("Username or password is incorrect");
    user.login(password);
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user || !user.loggedIn) throw new Error("No such user is logged in");
    user.logout();
  }

  createScooter(station) {
    if (!this.stations[station]) throw new Error("No such station");
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log(`Created new scooter #${scooter.serial} at ${station}`);
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) throw new Error("No such station");
    if (scooter.station === station)
      throw new Error("Scooter already at station");
    scooter.dock(station);
    this.stations[station].push(scooter);
  }

  rentScooter(scooter, user) {
    const station = Object.keys(this.stations).find((st) =>
      this.stations[st].includes(scooter)
    );
    if (station) {
      this.stations[station] = this.stations[station].filter(
        (s) => s.serial !== scooter.serial
      );
      scooter.rent(user);
      console.log(`Scooter #${scooter.serial} rented to ${user.username}`);
    } else {
      throw new Error("Scooter already rented");
    }
  }

  print() {
    console.log("Registered Users:");
    console.log(this.registeredUsers);

    console.log("Stations and scooters:");
    Object.entries(this.stations).forEach(([station, scooters]) => {
      console.log(`${station}: ${scooters.length} scooters`);
    });
  }
}

module.exports = ScooterApp;
