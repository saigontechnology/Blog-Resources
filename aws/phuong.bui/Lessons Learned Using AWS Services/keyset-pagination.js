// Assume you have a DynamoDB table with a 'timestamp' field
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function fetchRecords(lastEvaluatedKey) {
  const params = {
    TableName: "myTable",
    Limit: 10, // Number of records per page
    ExclusiveStartKey: lastEvaluatedKey, // Use the last evaluated key
  };

  try {
    const result = await dynamodb.scan(params).promise();
    return {
      items: result.Items,
      lastEvaluatedKey: result.LastEvaluatedKey,
    };
  } catch (error) {
    console.error("Error fetching records:", error);
    return {
      items: [],
      lastEvaluatedKey: null,
    };
  }
}

// Example usage
const startKey = null; // Initial start key (null for the first page)

fetchRecords(startKey)
  .then(({ items, lastEvaluatedKey }) => {
    // Process the items (e.g., render them on the page)
    console.log(items);
    // Use 'lastEvaluatedKey' for the next page
  })
  .catch((error) => {
    console.error("Error:", error);
  });
