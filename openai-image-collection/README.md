# OpenAI Image Collection

This is a simple Node.js server that automatically generates images based on text prompts stored in a CSV file using the OpenAI API.

## Overview

The server reads prompts from a CSV file and periodically sends these prompts to OpenAI's image generation API. It then saves the generated images locally and logs metadata about each image in a JSON file.

## Requirements

To run this server, you need Node.js installed on your machine. You can download it from [Node.js](https://nodejs.org/en) official website. You also need to have NPM installed. 

Use your terminal to check if you installed the packages with: 

```bash
node -v
npm -v
```

## Setup

1. Install Node.js, check in the terminal with `node -v`
2. Install NPM, check in the terminal with `npm -v`
3. Configure the API Key: Replace the placeholder API key in the `fetchOpenAIImage? function (line 83) with your actual OpenAI API key. You need to create an account on the [OpenAI Platform](https://platform.openai.com/) to create a key.
4. Ensure your CSV file with text prompts is named correctly and placed in the ./input directory. You can update the filepath at the beginning of `sketch.js`
3. Open the folder with VS Code
4. Enter `npm install` in the terminal to install all dependencies
5. Run the script with `npm start`
6. Quit the script with CONTROL + Q

## Output

Generated images are saved in the `./output` directory with names like `image-1.png`, `image-2.png`, etc. Metadata about each image, including the filename, prompt used, and generation date, is saved in `image-database.json` in the same directory.

## Note

Ensure not to expose your API key in production environments.
Adjust the imageCounter variable in the script to continue from the last saved image number to avoid overwriting existing images.

## Credits

Created by Max Frischknecht, Michi Flückiger & Silván Waidmann in the Modul Play 4 @ DD+A Spring Semester 2024