require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public"));
});

const { getJobs, createJob, deleteJob } = require("./controller");

app.get(`/api/jobs`, getJobs);
app.post(`/api/jobs`, createJob);
app.delete(`/api/jobs/:id`, deleteJob);
// app.put(`/api/houses/:id`, updateHouse);

app.listen(4004, () => console.log("Server running on port 4004"));
