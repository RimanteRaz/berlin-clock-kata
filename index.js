require("readline")
  .createInterface({ input: process.stdin })
  .on("line", line => console.log(line + " => " + toBerlinClock(line)));

class DigitalClock {
  constructor(line) {
    const timeArray = line.split(":");
    this.hours = parseInt(timeArray[0]);
    this.minutes = parseInt(timeArray[1]);
    this.seconds = parseInt(timeArray[2]);
  }
}

class BerlinClock {
  constructor(digitalClock) {
    this.topYellowLight = this.getFirstLight(digitalClock.seconds);
    this.firstRow = this.getFirstRow(digitalClock.hours);
    this.secondRow = this.getSecondRow(digitalClock.hours);
    this.thirdRow = this.getThirdRow(digitalClock.minutes);
  }
  fourLights = {
    0: "....",
    1: "X...",
    2: "XX..",
    3: "XXX.",
    4: "XXXX",
  };
  getFirstLight = seconds => {
    return seconds % 2 === 0 ? "." : "X";
  };
  getFirstRow = hours => {
    const fiveHourRecurence = Math.floor(hours / 5);
    return this.fourLights[fiveHourRecurence];
  };
  getSecondRow = hours => {
    const remainingHours = hours - 5 * Math.floor(hours / 5);
    return this.fourLights[remainingHours];
  };
  getThirdRow = minutes => {
    const lights = ["X", "X", "|"];
    return "...........";
  };
  display = () => {
    return `${this.topYellowLight} ${this.firstRow} ${this.secondRow}`;
  };
}

function toBerlinClock(line) {
  const digitalClock = new DigitalClock(line);
  const berlinClock = new BerlinClock(digitalClock);
  return berlinClock.display();
}
