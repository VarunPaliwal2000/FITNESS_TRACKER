import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// import UserRoutes from "./routes/User.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Aagta oye!!",
  });
});

const connectMongoDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGOD_B)
    .then((res) => console.log("connected to mongoose"))
    .catch((err) => console.log(err));
};

const startServer = async () => {
  try {
    connectMongoDB();
    app.listen(8080, () => console.log("Hurray"));
  } catch (err) {
    console.log(err);
  }
};

startServer();
