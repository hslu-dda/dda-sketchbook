let hexArray = [
  "#F7F4EA",
  "#DED9E2",
  "#C0B9DD",
  "#80A1D4",
  "#75C9C8",
  "#11242D",
];

let colorArray = [];

let data;
let migSortedAscending;

let rectSize = 70;
let padding = 20;

function preload() {
  d3.csv("./data/selbstwirksamkeit.csv", d3.autoType).then((csv) => {
    console.log("Loaded data: ", csv);
    data = percentageToNumbers(csv);
    console.log("Data with numbers: ", data);
    migSortedAscending = sortArray(data, "asc", "Value");
    console.log("Migration Sorted Ascending:", migSortedAscending);
  });
}

function setup() {
  createCanvas(850, 400);
  colorArray = [
    color("#F7F4EA"),
    color("#C0B9DD"),
    color("#CD9DD1"),
    color("#80A1D4"),
    color("#75C9C8"),
    color("#11242D"),
  ];
}

function draw() {
  background(220);
  text("color Palette", 10, 15);
  for (let i = 0; i < width; i += 10) {
    let myColor = getMappedElement(i, 0, width, colorArray);
    fill(myColor);
    rect(i, 20, 10, 20);
  }

  let xPos = padding;
  let yPos = height / 2 - rectSize / 2;
  for (let i = 0; i < migSortedAscending.length; i++) {
    let myColor = getMappedElement(
      migSortedAscending[i].Value,
      29,
      39.2,
      colorArray
    );
    fill(myColor);
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

// Function to get the closest element based on a given value
function getMappedElement(value, min, max, array) {
  let index = Math.floor(map(value, min, max, 0, array.length));
  index = constrain(index, 0, array.length - 1);
  return array[index];
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
