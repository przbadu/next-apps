import mongoose, { Schema } from "mongoose";

let isConnected: boolean = false;

const tagSchema = new Schema({
  name: String,
});

const authorSchema = new Schema({
  email: String,
  name: String,
});

const questionSchema = new Schema({
  title: String,
  explanation: String,
  tags: [tagSchema],
  author: [authorSchema],
});

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.error("MONGODB_URL is not defined");
  }

  if (isConnected) {
    return console.error("Already connected to database");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });

    isConnected = true;

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB failed to connect!", error);
  }
};
