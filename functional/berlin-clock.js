require("readline")
  .createInterface({ input: process.stdin })
  .on("line", line => console.log(line + " => " + toBerlinClock(line)));

function toBerlinClock(line) {
  return getBerlinClock(line);
}

const getBerlinClock = line => {
  const [hours, minutes, seconds] = getTime(line);

  const topYellowLight = getTopYellowLight(seconds);
  const firstRow = convertToLights(getCount(hours), 4);
  const secondRow = convertToLights(getRemaining(hours), 4);
  const thirdRow = getThirdRow(minutes);
  const lastRow = convertToLights(getRemaining(minutes), 4);

  return `${topYellowLight} ${firstRow}  ${secondRow} ${thirdRow} ${lastRow}`;
};

const getTime = line => {
  const hours = splitString(line, 0, 2);
  const minutes = splitString(line, 3, 5);
  const seconds = splitString(line, 6, 8);
  return [+hours, +minutes, +seconds];
};

const splitString = (string, start, end) => {
  return start < end ? string[start] + splitString(string, start + 1, end) : "";
};

function repeat(x, count) {
  return count > 0 ? x + repeat(x, count - 1) : "";
}

const getTopYellowLight = seconds => {
  return seconds % 2 === 0 ? "." : "X";
};

const getCount = time => {
  return Math.floor(time / 5);
};

const getRemaining = time => {
  return time - getCount(time) * 5;
};

const getThirdRow = minutes => {
  const yellowLights = convertToLights(getCount(minutes), 11);
  const yellowAndRedLights = [...yellowLights].map((char, index) => {
    return isRed(char, index);
  });
  return yellowAndRedLights.reduce((acc, cur) => acc + cur);
};

const isRed = (light, index) => {
  return light === "X" && (index + 1) % 3 === 0 ? "|" : light;
};

const convertToLights = (litCount, numberOfFields) => {
  return repeat("X", litCount) + repeat(".", numberOfFields - litCount);
};

function repeat(x, count) {
  return count > 0 ? x + repeat(x, count - 1) : "";
}
