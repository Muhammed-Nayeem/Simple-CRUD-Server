const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middlewares:
app.use(cors());
app.use(express.json());

//mdb:
// mohammednayeem808
// 8i3kci1eCMDN8Odt
const uri = "mongodb+srv://mohammednayeem808:8i3kci1eCMDN8Odt@cluster0.fyclago.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//root navigation url api:
app.get("/", (req, res) => {
  res.send("SIMPLE CRUD SERVER CREATED...!");
});

//Db server running:
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //database connection:
    const database = client.db("usersDB");
    const usersCollection = database.collection("usersCollection");

    //post api:
    app.post("/users", (req, res) => {
      const user = req.body;
      const result = usersCollection.insertOne(user);
      res.send(result);
      console.log(user);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Simple CRUD Server is running on PORT ${port}`);
});
