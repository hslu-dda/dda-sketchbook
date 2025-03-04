let data;
let migSortedAscending;

let min;
let max;

let duration = 2000;
let initTime;
let arrayIndex = 0;

let previousHeight = 0;
let targetHeight = 0;

let fromColor;
let toColor;
let previousColor;
let nextColor;

function preload() {
  d3.csv("./data/selbstwirksamkeit.csv", d3.autoType).then((csv) => {
    console.log("Loaded data: ", csv);
    data = percentageToNumbers(csv);
    console.log("Data with numbers: ", data);
    migSortedAscending = sortArray(data, "asc", "Value");
    console.log("Migration Sorted Ascending:", migSortedAscending);
    ({ max, min } = findMinMax(data));
  });
}

function setup() {
  createCanvas(400, 400);
  console.log("setup", min, max);
  initTime = millis();

  fromColor = color("#A5D2FF");
  toColor = color("#FF18C1");
  previousColor = fromColor;
  nextColor = previousColor;
}

function draw() {
  background(220);

  let now = millis();
  if (now > initTime + duration) {
    timeIsUp();
  }

  let v = migSortedAscending[arrayIndex].Value;
  targetHeight = map(v, min, max, 20, height - 40);
  let h = ease(initTime, 1000, previousHeight, targetHeight, "easeOutBounce");

  let colLerpPos = ease(initTime, 1000, 0, 1, "easeLinear");
  console.log(colLerpPos);
  let col = lerpColor(previousColor, nextColor, colLerpPos);

  fill(col);
  rect(width / 2, height - h - 20, 10, h);
}

function timeIsUp() {
  let val = migSortedAscending[arrayIndex].Value;
  previousHeight = map(val, min, max, 20, height - 40);

  let lerpPos = map(val, min, max, 0, 1);
  previousColor = lerpColor(fromColor, toColor, lerpPos);

  initTime = millis();
  arrayIndex += 1;
  if (arrayIndex > migSortedAscending.length - 1) {
    arrayIndex = 0;
  }
  let nextval = migSortedAscending[arrayIndex].Value;

  lerpPos = map(nextval, min, max, 0, 1);
  nextColor = lerpColor(fromColor, toColor, lerpPos);
}

// -------- Helper Functions -----------
// percentageToNumbers

// convert Value: '95%' to Value: 95
function percentageToNumbers(inputArray) {
  const convertedArray = inputArray.map((obj) => {
    // Remove the '%' from 'Value'
    const justNumber = obj.Value.replace("%", "");
    // convert to data type number
    const valueAsNumber = parseFloat(justNumber);
    // Reassign the new number-value
    obj.Value = valueAsNumber;
    // Return the object to the array
    return obj;
  });
  return convertedArray;
}

function getHighestValue(inputArray) {
  const highestValueObject = inputArray.reduce((prev, current) => {
    // Test each element against each other
    if (prev.Value > current.Value) {
      return prev;
    } else {
      return current;
    }
  });
  // return the highest value object that you found
  return highestValueObject;
}

function findMinMax(data) {
  // Initialize min and max variables with the first value in the array
  let min = data[0].Value;
  let max = data[0].Value;

  // Iterate over the array starting from the second element
  for (let i = 1; i < data.length; i++) {
    // Update min if current value is smaller
    if (data[i].Value < min) {
      min = data[i].Value;
    }
    // Update max if current value is larger
    if (data[i].Value > max) {
      max = data[i].Value;
    }
  }
  // Return min and max values
  return { min, max };
}

function sortArray(inputArray, sortOrder, sortByKey) {
  // Create a copy of the array to avoid modifying the original array
  const sortedArray = [...inputArray];

  // Use the sort method with a comparison function
  sortedArray.sort((a, b) => {
    if (sortOrder === "asc") {
      // For ascending order, compare the value keys directly
      if (a[sortByKey] < b[sortByKey]) {
        return -1;
      }
      if (a[sortByKey] > b[sortByKey]) {
        return 1;
      }
      return 0; // a and b are equal
    } else if (sortOrder === "desc") {
      // For descending order, reverse the comparison
      if (a[sortByKey] > b[sortByKey]) {
        return -1;
      }
      if (a[sortByKey] < b[sortByKey]) {
        return 1;
      }
      return 0; // a and b are equal
    }
  });

  // Return the sorted array
  return sortedArray;
}
