// THE SERVER CODE
console.log("app is running");

// The modules needed ("libraries")
const fetch = require("node-fetch");
const fs = require("fs");
const csv = require("csv-parser");

// global variables
let allPrompts = [];
let currentPrompt = "";
const csvPath = "./input/example-prompts.csv";

// this number creates the filename. 
// To continue where you stopped, just add the number of images already created + 1
let imageCounter = 8;

// Time interval: every 20 seconds we generate prompt + image
let timingInterval = 20000;

// Function to read a csv with textprompts
const readCsvFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(csv())
      .on("data", (row) => {
        allPrompts.push(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

// Main function to orchestrate the loading and periodic calls
async function main() {
  try {
    // Ensure the CSV is loaded before starting the interval
    await readCsvFile(csvPath);
    // Set the timing function to run every X seconds
    setInterval(timingFunction, timingInterval);
  } catch (error) {
    console.error("Error processing CSV file:", error);
  }
}
// call the main function to start everything
main();

// Function to be called every 20 seconds
function timingFunction() {
  console.log("timing function called at", new Date());
  if (allPrompts.length > 0) {
    // create a random prompt
    currentPrompt = generatePrompt();
    // call openAI to generate an image
    fetchOpenAIImage();
  }
}

// Function to create prompts from the loaded csv file
function generatePrompt() {
  // Select a random object from the csv array
  const randomIndex = Math.floor(Math.random() * allPrompts.length);
  const randomObject = allPrompts[randomIndex];

  // Create a string/prompt from all values of all properties of the object
  const newPrompt = Object.values(randomObject).join(" ");

  // log & return the prompt
  console.log("new prompt:", newPrompt);
  return newPrompt;
}

// Function to call OpenAI API and handle the image
const fetchOpenAIImage = async () => {
  console.log("received prompt, waiting for image ...");

  // WARNING: Do not expose your real API key in production environments
  const apiKey = "YOUR_API_KEY";

  // send the request to openAI with "currentPrompt" (global variable)
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: currentPrompt,
      n: 1,
      size: "1024x1024",
    }),
  });

  // get data data
  const imageData = await response.json();
  if (imageData.data && imageData.data.length > 0) {
    console.log("got image!");
    // get the image url
    const imageUrl = imageData.data[0].url;
    // pass the url to an download function that saves a local file
    await downloadImage(imageUrl);
  } else {
    console.error("Failed to generate image:", data);
  }
};

// Function to download image from an url and save it locally
const downloadImage = async (url) => {
  console.log("saving image...");
  // fetch the image from the open ai server
  const response = await fetch(url);
  const buffer = await response.buffer();
  // save the file locally
  fs.writeFile("./output/image-" + imageCounter + ".png", buffer, () =>
    console.log("Finished downloading and saving image.")
  );
  // update the json file
  updateDatabase();
};

// Function to save the filename, prompt and date into a local json to keep track
const path = "./output/image-database.json"
const updateDatabase = () => {
  console.log("updating database...");

  // create an object with metadata to save to the json file
  const newData = {
      filename: "image-" + imageCounter + ".png",
      description: currentPrompt,
      date: new Date()
  };

  // First, read the existing data
  fs.readFile(path, (err, data) => {
      if (err) {
          // Handle the case where the file does not exist by creating it with initial data
          if (err.code === 'ENOENT') {
              console.log('File not found. Creating new file with initial data.');
              fs.writeFile(path, JSON.stringify([newData], null, 2), err => {
                  if (err) {
                      console.error('Error writing initial data:', err);
                  } else {
                      console.log(`Initial data written: ${JSON.stringify([newData])}`);
                  }
              });
          } else {
              console.error("Error reading data:", err);
          }
      } else {
          // Parse the existing data and append the new data
          let existingData = JSON.parse(data);
          existingData.push(newData);
          fs.writeFile(path, JSON.stringify(existingData, null, 2), err => {
              if (err) {
                  console.error("Error writing data:", err);
              } else {
                  console.log(`Data appended: ${JSON.stringify(newData)}`);
              }
          });
      }
  });

  imageCounter++;
};

