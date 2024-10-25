// Import the Scooter and User classes from their files
const Scooter = require("../src/Scooter");
const User = require("../src/User");

// Describe the test suite for the Scooter class
describe("Scooter Class", () => {
  // Test case to check the initialization of Scooter properties
  test("Should initialize Scooter properties correctly", () => {
    // Create a new instance of Scooter with a station
    const scooter = new Scooter("Downtown");

    // Check if the station property is set correctly
    expect(scooter.station).toBe("Downtown");
    // Check if the charge property is initialized to 100
    expect(scooter.charge).toBe(100);
    // Check if the isBroken property is initialized to false
    expect(scooter.isBroken).toBe(false);
  });

  // Test case to rent the scooter when it is charged and not broken
  test("Should rent scooter if charge > 20 and not broken", () => {
    // Create a new User instance
    const user = new User("johnDoe", "password", 20);
    // Create a new instance of Scooter
    const scooter = new Scooter("Downtown");
    // Rent the scooter to the user
    scooter.rent(user);

    // Check if the scooters user property is set to the user
    expect(scooter.user).toBe(user);
    // Check if the scooter is no longer at a station (its checked out)
    expect(scooter.station).toBe(null);
  });

  // Test  to ensure the scooter cannot be rented if charge is low
  test("Should not rent scooter if charge <= 20", () => {
    // Create  User instance
    const user = new User("janeDoe", "password", 20);
    // Create a new instance of Scooter
    const scooter = new Scooter("Downtown");
    // Set the scooter's charge to 20
    scooter.charge = 20;
    // Expect the rent method to throw an error when trying to rent the scooter
    expect(() => scooter.rent(user)).toThrow("Scooter needs to charge");
  });
});
