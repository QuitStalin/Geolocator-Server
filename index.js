const express = require("express");
const app = express();
const Datastore = require("nedb");
const port = 8000;

app.listen(port, () => {
  console.log("Running on port 8000 :>");
});

//this makes the folder called "public" accessable
app.use(express.static("public"));
//this enables the server to parse incoming json data, aka
//you need this line of code to get the "request.body"
app.use(express.json());

const database = new Datastore({ filename: "database.db" });
database.loadDatabase();

app.post("/api", (request, response) => {
  console.log("I got a request!");
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  console.log(data);
  response.json(data);
});

app.get("/gimmeData", (request, response) => {
  database.find({}, (err, data) => {
    response.json(data);
  });
});
