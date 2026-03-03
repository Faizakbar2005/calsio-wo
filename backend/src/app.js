const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const workoutRoutes = require("./routes/workout.routes");
const historyRoutes = require("./routes/history.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/history", historyRoutes);

module.exports = app;