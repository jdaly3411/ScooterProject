// Creating a class for the scooter
class Scooter {
  static nextSerial = 1;
  constructor(station) {
    this.station = station; // Setting default values for the constructor
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user) {
    if (this.charge > 20 && !this.isBroken) {
      // Checking if the charge is greater than 20 and isn't broken
      this.user = user;
      this.station = null;
      console.log(`Scooter rented to ${user.username}`);
    } else if (this.charge <= 20) {
      throw new Error("Scooter needs to charge."); // Scooter Needs Charging
    } else if (this.isBroken) {
      throw new Error("Scooter needs repair."); // Scooter Needs Repair
    }
  }

  // Making a dock function, and checking where the scooter is docked at.
  dock(station) {
    this.station = station;
    this.user = null;
    console.log(`Scooter #${this.serial} is docked at ${station}`);
  }
  // Async function from Multiverse with help from Claude
  async recharge() {
    console.log("Starting charge...");
    for (let i = this.charge; i < 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Waiting 1 second for demonstration
      this.charge = Math.min(100, i + 20);
      console.log(`Charge: ${this.charge}%`);
    }
    console.log("Charge Complete");
  }
  // Async function from Multiverse with help from Claude,
  async requestRepair() {
    console.log("Repair Requested...");
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate repair
    this.isBroken = false;
    console.log("Repair Completed");
  }
}
// So this can be refrenced elsewhere (the tests)
module.exports = Scooter;

// +-------------------------+
// |        Scooter          |
// +-------------------------+
// | - station: string       |
// | - user: User            |
// | - serial: number        |
// | - charge: number        |
// | - isBroken: boolean     |
// | - nextSerial: static    |
// +-------------------------+
// | + constructor(station)  |
// | + rent(user: User): void|
// | + dock(station: string): void |
// | + recharge(): void      |
// | + requestRepair(): void |
// +-------------------------+

// +------------------------+
// |        User            |
// +------------------------+
// | - login()              |
// | - logout()             |
// | - rentScooter()        |
// | - returnScooter()      |
// | - register()           |
// +------------------------+
//            |
//            v
// +------------------------+
// |      ScooterApp       |
// +------------------------+
// | + registerUser()      |
// | + loginUser()         |
// | + logoutUser()        |
// | + createScooter()     |
// | + rentScooter()       |
// | + dockScooter()       |
// | + print()             |
// +------------------------+
