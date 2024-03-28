// Example JavaScript code to request image generation from OpenAI's API
// Max Frischknecht, 2024

const generateImage = async () => {
  const prompt = "fully automated luxury communism"; // Example prompt
  const apiKey = "YOURAPIKEY"; // WARNING: Do not expose your real API key in production environments
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1, // Number of images to generate
      size: "512x512", // Image size
    }),
  });

  const data = await response.json();
  console.log(data);
  return data;
};

const displayImage = async () => {
  try {
    const imageData = await generateImage();
    if (imageData.data && imageData.data.length > 0) {
      // Assuming the API returns an image URL (adjust according to the actual response structure)
      const imageUrl = imageData.data[0].url;
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      document.body.appendChild(imgElement);
    } else {
      console.error("Failed to retrieve image data:", imageData);
    }
  } catch (error) {
    console.error("Error generating image:", error);
  }
};

// Call the displayImage function to generate and display the image
displayImage();
