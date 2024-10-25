// tests/ScooterApp.test.js

const ScooterApp = require("../src/ScooterApp");
const User = require("../src/User");
const Scooter = require("../src/Scooter");

describe("ScooterApp Class", () => {
  let app;

  beforeEach(() => {
    app = new ScooterApp();
  });

  test("Should register a new user successfully", () => {
    const user = app.registerUser("johnDoe", "password", 20);
    expect(user.username).toBe("johnDoe");
    expect(app.registeredUsers["johnDoe"]).toBe(user);
  });

  test("Should throw error when registering an already registered user", () => {
    app.registerUser("johnDoe", "password", 20);
    expect(() => app.registerUser("johnDoe", "password", 20)).toThrow(
      "User already registered"
    );
  });

  test("Should throw error when registering a user under 18", () => {
    expect(() => app.registerUser("youngUser", "password", 17)).toThrow(
      "User too young to register"
    );
  });

  test("Should log in a registered user successfully", () => {
    app.registerUser("johnDoe", "password", 20);
    app.loginUser("johnDoe", "password");
    expect(app.registeredUsers["johnDoe"].loggedIn).toBe(true);
  });

  test("Should log out a logged-in user successfully", () => {
    app.registerUser("johnDoe", "password", 20);
    app.loginUser("johnDoe", "password");
    app.logoutUser("johnDoe");
    expect(app.registeredUsers["johnDoe"].loggedIn).toBe(false);
  });

  test("Should throw error when logging out a non-logged-in user", () => {
    app.registerUser("johnDoe", "password", 20);
    expect(() => app.logoutUser("johnDoe")).toThrow(
      "No such user is logged in"
    );
  });

  test("Should create a scooter and add it to a station", () => {
    const scooter = app.createScooter("Downtown");
    expect(app.stations["Downtown"]).toContain(scooter);
  });

  test("Should throw error when creating a scooter for a non-existing station", () => {
    expect(() => app.createScooter("NonExistingStation")).toThrow(
      "No such station"
    );
  });

  test("Should dock a scooter at a station", () => {
    const scooter = app.createScooter("Downtown"); // Create a scooter at Downtown
    app.dockScooter(scooter, "MidCity"); // Attempt to dock at MidCity

    // Check if the scooter is now at the new station
    expect(scooter.station).toBe("MidCity");
    expect(app.stations["MidCity"]).toContain(scooter); // Ensure its in the MidCity station
    expect(app.stations["Downtown"]).not.toContain(scooter); // Ensure is removed from Downtown
  });

  test("Should throw error when docking a scooter that is already at the station", () => {
    const scooter = app.createScooter("Downtown");
    expect(() => app.dockScooter(scooter, "Downtown")).toThrow(
      "Scooter already at station"
    );
  });

  test("Should rent a scooter to a user", () => {
    const user = app.registerUser("johnDoe", "password", 20);
    app.loginUser("johnDoe", "password");
    const scooter = app.createScooter("Downtown");
    app.rentScooter(scooter, user);
    expect(scooter.user).toBe(user); // Assuming this sets scooter.user
    expect(app.stations["Downtown"]).not.toContain(scooter);
  });

  test("Should throw error when renting a scooter that is not available", () => {
    const user = app.registerUser("johnDoe", "password", 20);
    app.loginUser("johnDoe", "password");
    const scooter = new Scooter("Downtown");
    expect(() => app.rentScooter(scooter, user)).toThrow(
      "Scooter not available at the station"
    );
  });

  test("Should print the registered users and stations with scooter counts", () => {
    app.registerUser("johnDoe", "password", 20);
    app.createScooter("Downtown");
    console.log = jest.fn(); // Mock console.log to test output
    app.print();
    expect(console.log).toHaveBeenCalledWith("Registered Users:");
    expect(console.log).toHaveBeenCalledWith("johnDoe");
    expect(console.log).toHaveBeenCalledWith("Stations and Scooter Count:");
    expect(console.log).toHaveBeenCalledWith("Downtown: 1 scooters");
  });
});
