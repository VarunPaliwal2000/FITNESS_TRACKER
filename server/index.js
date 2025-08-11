import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/UserRoute.js";
import Workout from "./models/WorkoutModel.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Aagta oye!!",
  });
});
// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
const connectMongoDB = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGOD_B);
  console.log("✅ Connected to MongoDB");

  // 🚨 Drop all indexes on "workouts" collection except the default _id
  try {
    const indexes = await Workout.collection.getIndexes();
    for (const indexName of Object.keys(indexes)) {
      if (indexName !== "_id_") {
        await Workout.collection.dropIndex(indexName);
        console.log(`🗑️ Dropped index: ${indexName}`);
      }
    }
    console.log("✅ All non-default indexes dropped.");
  } catch (err) {
    console.error("⚠️ Error dropping indexes:", err.message);
  }
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
