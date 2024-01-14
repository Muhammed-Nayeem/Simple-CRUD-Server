const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middlewares:
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SIMPLE CRUD SERVER CREATED...!");
});

app.listen(port, () => {
  console.log(`Simple CRUD Server is running on PORT ${port}`);
});
