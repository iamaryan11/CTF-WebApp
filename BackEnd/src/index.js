const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const master = require("./config/db");
const redisClient = require("./config/redis");
const { authRouter } = require("./routes/userAuth");
const { adminRight } = require("./routes/adminTakat");
const flagRoutes = require("./routes/flagRoutes");
const leaderRoute = require("./routes/leaderRoutes");
const router = require("./routes/flagRoutes");
const eventTimerRoute = require("./routes/eventTimerRoute");

const dotenv = require("dotenv");
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "UPDATE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/event-time", eventTimerRoute);

app.use("/user", authRouter);
app.use("/letadmincook", adminRight);
app.use("/api", flagRoutes);
app.use("/see", leaderRoute);
app.use("/user", router);

const InitializeConnection = async () => {
  try {
    await Promise.all([master(), redisClient.connect()]);
    console.log(`both database connected succefully`);
    app.listen(process.env.BE_PORT, () => {
      console.log(`server listening at port: ${process.env.BE_PORT}`);
    });
  } catch (err) {
    console.log(`Error occured while connecting to the database ` + err);
  }
};
InitializeConnection();
