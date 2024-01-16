const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middlewares:
app.use(cors());
app.use(express.json());

//mdb:
// mohammednayeem808
// 8i3kci1eCMDN8Odt
const uri =
  "mongodb+srv://mohammednayeem808:8i3kci1eCMDN8Odt@cluster0.fyclago.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
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
    // const database = client.db("usersDB");
    // const userCollection = database.collection("users");

    //database connection in one-line:
    const usersCollection = client.db("usersDB").collection("users");

    //get api:
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const users = await cursor.toArray();
      res.send(users);
    });

    //single user data load api:
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await usersCollection.findOne(query);
      res.send(user);
    });

    //post api:
    app.post("/users", async (req, res) => {
      const user = await req.body;
      // const result = await userCollection.insertOne(user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
      console.log(user);
    });

    //put api:
    app.put("/users/:id", async (req, res) => {
      const user = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateUser = {
        $set: {
          name: user.name,
          profession: user.profession,
          email: user.email,
        },
      };
      const updatedUser = await usersCollection.updateOne(filter, updateUser, options);
      res.send(updatedUser);
    });

    //delete api:
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Simple CRUD Server is running on PORT ${port}`);
});
