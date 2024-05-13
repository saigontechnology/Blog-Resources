// server.js
const express = require("express");
const AWS = require("aws-sdk");

const app = express();
const PORT = process.env.PORT || 3000;

// Configure AWS credentials (replace with your own)
AWS.config.update({
  accessKeyId: "YOUR_ACCESS_KEY",
  secretAccessKey: "YOUR_SECRET_KEY",
  region: "us-east-1", // Replace with your desired region
});

const s3 = new AWS.S3();

// API route for generating pre-signed URLs
app.post("/api/upload", (req, res) => {
  try {
    const { fileName, mimeType } = req.body; // Assuming the client sends these fields

    const params = {
      Bucket: "your-s3-bucket-name",
      Key: `uploads/${fileName}`, // Customize the folder structure
      ContentType: mimeType,
      Expires: 60, // URL expiration time in seconds
    };

    const url = s3.getSignedUrl("putObject", params);
    res.json({ url });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
