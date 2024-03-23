// Import necessary dependencies
const { MongoClient } = require("mongodb");

// Define the handler function for the serverless function
module.exports = async (req, res) => {
  // Extract data from the request body
  const { publicKey, amount } = req.body;

  try {
    // Connect to the MongoDB database using the db_uri environment variable
    const client = new MongoClient(process.env.db_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    // Access the database and collection
    const database = client.db("your_database_name");
    const collection = database.collection("transactions");

    // Insert the transaction data into the collection
    const result = await collection.insertOne({
      publicKey,
      amount,
      timestamp: new Date(),
    });

    // Close the database connection
    await client.close();

    // Send a success response with the inserted data
    res.status(201).json({ success: true, data: result.ops[0] });
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
