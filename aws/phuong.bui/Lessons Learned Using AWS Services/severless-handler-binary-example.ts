// Import the necessary modules
import AwsServerlessExpress from "aws-serverless-express";
import { application } from "./index"; // Assuming you have an 'index.js' file with your Express app

// Create an AWS Serverless Express server
const server = AwsServerlessExpress.createServer(application);

// Lambda function handler
export const main = (event: any, context: any) => {
  // Extract the 'Content-Type' header from the event
  const contentTypeHeader =
    event.headers["Content-Type"] || event.headers["content-type"];

  // If the request body exists and the content type is 'multipart/form-data'
  if (event.body && contentTypeHeader.includes("multipart/form-data")) {
    // Convert the body to a string (assuming it's base64-encoded)
    event.body = Buffer.from(
      event.body,
      event.isBase64Encoded ? "base64" : "binary"
    ) as unknown as string;
  }

  // Proxy the request to the Express server
  AwsServerlessExpress.proxy(server, event, context);
};
