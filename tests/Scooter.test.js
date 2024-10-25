const Scooter = require("../src/Scooter");
const User = require("../src/User");

describe("Scooter Class", () => {
  test("Should initialize Scooter properties correctly", () => {
    const scooter = new Scooter("Downtown");
    expect(scooter.station).toBe("Downtown");
    expect(scooter.charge).toBe(100);
    expect(scooter.isBroken).toBe(false);
  });

  test("Should rent scooter if charge > 20 and not broken", () => {
    const user = new User("johnDoe", "password", 20);
    const scooter = new Scooter("Downtown");
    scooter.rent(user);
    expect(scooter.user).toBe(user);
    expect(scooter.station).toBe(null);
  });

  test("Should not rent scooter if charge <= 20", () => {
    const user = new User("janeDoe", "password", 20);
    const scooter = new Scooter("Downtown");
    scooter.charge = 20;
    expect(() => scooter.rent(user)).toThrow("Scooter needs to charge");
  });
});
