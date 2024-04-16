let data;
let rectSize = 70;
let padding = 20;

let fromColor;
let toColor;

let migSortedAscending;

// Function to load data asynchronously
async function loadData() {
  // Use fetch or any other method to load the data
  const response = await fetch("data.json");
  const data = await response.json();
  return data;
}

function preload() {
  d3.csv("./data/selbstwirksamkeit.csv", d3.autoType).then((csv) => {
    console.log("Loaded data: ", csv);
    data = percentageToNumbers(csv);
    console.log("Data with numbers: ", data);
    migSortedAscending = sortArray(data, "asc", "Value");
    console.log("Migration Sorted Ascending:", migSortedAscending);

    // d3 way. still need to copy the array if you want to prevent mutations
    let migSort = [...data].sort((a, b) => d3.ascending(a.Value, b.Value));

    console.log("migSort Sorted Ascending:", migSort);
  });
}

function setup() {
  createCanvas(850, 400);
  console.log(data);
  const { max, min } = findMinMax(data);
  //let [minValue, maxValue] = d3.extent(data, (d) => d.Value);
  //let min=d3.min(data, (d) => d.Value);
  console.log(min, max);
  fromColor = color("#A5D2FF");
  toColor = color("#FF18C1");
}

function draw() {
  background(220);
  let xPos = padding;
  let yPos = height / 3 - rectSize / 2;
  for (let i = 0; i < data.length; i++) {
    let lerpPos = map(data[i].Value, 29, 39.2, 0, 1);
    const lerpedCol = lerpColor(fromColor, toColor, lerpPos);
    fill(lerpedCol);
    rect(xPos, yPos, rectSize);
    fill(0);
    text(str(data[i].Value), xPos, yPos + rectSize + 20);
    xPos += rectSize + padding;
  }

  // reset
  xPos = padding;
  yPos = (height / 3) * 2 - rectSize / 2;
  for (let i = 0; i < migSortedAscending.length; i++) {
    let lerpPos = map(migSortedAscending[i].Value, 29, 39.2, 0, 1);
    const lerpedCol = lerpColor(fromColor, toColor, lerpPos);
    fill(lerpedCol);
    rect(xPos, yPos, rectSize);
    fill(0);
    text(str(migSortedAscending[i].Value), xPos, yPos + rectSize + 20);
    text(
      str(migSortedAscending[i].Faktorauspraegung),
      xPos,
      yPos + rectSize + 20,
      rectSize
    );

    xPos += rectSize + padding;
  }
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
