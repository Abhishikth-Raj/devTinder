const express = require("express");
//creating an instance of express js application, basically creating a web server that runs on express framework
const app = express();
const connectDB = require("./configs/database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//middleware for JSON to JS conversion of request received to API
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/user");

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
connectDB()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
    console.log("MongoDB Connection Successful");
  })
  .catch((err) => {
    console.log("Database connection failed");
  });
