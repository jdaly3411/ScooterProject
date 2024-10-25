class Scooter {
  static nextSerial = 1;
  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user) {
    if (this.charge > 20 && !this.isBroken) {
      this.user = user;
      this.station = null;
      console.log(`Scooter rented to ${user.username}`);
    } else if (this.charge <= 20) {
      throw new Error("Scooter needs to charge.");
    } else if (this.isBroken) {
      throw new Error("Scooter needs repair.");
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
    console.log(`Scooter #${this.serial} is docked at ${station}`);
  }
  async recharge() {
    console.log("Starting charge...");
    for (let i = this.charge; i < 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Waiting 1 second for demonstration
      this.charge = Math.min(100, i + 20);
      console.log(`Charge: ${this.charge}%`);
    }
    console.log("Charge Complete");
  }

  async requestRepair() {
    console.log("Repair Requested...");
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate repair
    this.isBroken = false;
    console.log("Repair Completed");
  }
}

module.exports = Scooter;
