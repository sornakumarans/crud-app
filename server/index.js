const express = require("express");
const users = require("./sample.json");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
const port = 8000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(express.json());

app.get("/users", (req, res) => {
  return res.json(users);
});

app.delete("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let filteredUsers = users.filter((user) => user.id !== id);
  fs.writeFile("./sample.json", JSON.stringify(filteredUsers), (err, data) => {
    return res.json(filteredUsers);
  });
});

app.post("/users", (req, res) => {
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.json({ message: "All Fields Required" });
  }
  let id = Date.now();
  users.push({ id, name, age, city });

  fs.writeFile("./sample.json", JSON.stringify(filteredUsers), (err, data) => {
    return res.json({ message: "User detail added success" });
  });
});

app.patch("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.json({ message: "All Fields Required" });
  }

  let index = users.findIndex((user) => user.id == id);
  user, splice(index, 1, { ...req.body });

  fs.writeFile("./sample.json", JSON.stringify(filteredUsers), (err, data) => {
    return res.json({ message: "User detail updated success" });
  });
});

app.listen(port, () => {
  console.log("Server is running in port ${PORT}");
});
