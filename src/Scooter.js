// Creating a class for the scooter
class Scooter {
  static nextSerial = 1;

  constructor(station) {
    this.station = station; // Initial station
    this.user = null; // Initially no user
    this.serial = Scooter.nextSerial++; // Unique serial number for the scooter
    this.charge = 100; // Initial charge percentage
    this.isBroken = false; // Indicates if the scooter is broken
  }

  rent(user) {
    // Check if the scooter can be rented based on charge and repair status
    if (this.charge > 20 && !this.isBroken) {
      this.user = user; // Set the current user
      this.station = null; // Scooter is now out for rent
      console.log(`Scooter rented to ${user.username}`);
    } else if (this.charge <= 20) {
      throw new Error("Scooter needs to charge."); // Scooter needs charging
    } else if (this.isBroken) {
      throw new Error("Scooter needs repair."); // Scooter needs repair
    }
  }

  // Method to dock the scooter at a station
  dock(station) {
    this.station = station; // Update the scooter's station
    this.user = null; // Clear the user as the scooter is docked
    console.log(`Scooter #${this.serial} is docked at ${station}`);
  }

  // Async function to recharge the scooter
  async recharge() {
    console.log("Starting charge...");
    for (let i = this.charge; i < 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second for demonstration
      this.charge = Math.min(100, i + 20); // Update charge percentage
      console.log(`Charge: ${this.charge}%`);
    }
    console.log("Charge Complete");
  }

  // Async function to request repair for the scooter
  async requestRepair() {
    console.log("Repair Requested...");
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate repair
    this.isBroken = false; // Mark scooter as repaired
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
