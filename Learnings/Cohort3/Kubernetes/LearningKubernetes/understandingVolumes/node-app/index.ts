const fs = require("fs");
const path = require("path");

// Function to generate random data
function generateRandomData(length: any) {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Write random data to a file
function writeRandomDataToFile(filePath: any, dataLength: any) {
  const data = generateRandomData(dataLength);
  fs.writeFile(filePath, data, (err: any) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Data written to file", filePath);
    }
  });
}

// Define the file path and data length
const filePath = path.join(__dirname, "/generated/randomData.txt");
const dataLength = 100; // Change this to desired length of random data

// Write random data to file every 10 seconds
setInterval(() => {
  writeRandomDataToFile(filePath, dataLength);
}, 10000); // 10000 ms = 10 seconds

// Keep the script running
console.log(
  "Node.js app is running and writing random data to randomData.txt every 10 seconds."
);
