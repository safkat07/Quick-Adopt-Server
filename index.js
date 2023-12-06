const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://QuickAdopt:QuickAdopt@cluster0.oykwxyb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const AllPetCategoryCollection = await client
      .db("QuickAdopt")
      .collection("AllPetCategory");

    app.get("/api/v1/allpetcategory", async (req, res) => {
      const cursor = AllPetCategoryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/api/v1/allpetcategory/:id", async (req, res,) => {
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await AllPetCategoryCollection.findOne(query)
      res.send(result)
    })

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

app.get("/", (req, res) => {
  res.send("Quick Adopt is working");
});
app.listen(port, () => {
  console.log(`Quick Adopt is working on port ${port}`);
});
