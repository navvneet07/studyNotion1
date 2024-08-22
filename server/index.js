import express, { json } from "express";


const app = express();

import userRoutes from "./routes/User";
import paymentRoutes from "./routes/Payments";
import profileRoutes from "./routes/Profile";
import CourseRoutes from "./routes/Course";

import { connect } from "./config/database";
import cookieParser from "cookie-parser";

import cors from "cors";
import fileUpload from "express-fileupload";
import { cloudnairyconnect } from "./config/cloudinary";

import { config } from "dotenv";
config();

const PORT = process.env.PORT || 4000;
connect();

app.use(json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://study-notion1-frontend.vercel.app"],
    credentials: true,
    maxAge: 14400,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudnairyconnect();

app.use("/api/v1/auth", userRoutes);

app.use("/api/v1/payment", paymentRoutes);

app.use("/api/v1/profile", profileRoutes);

app.use("/api/v1/course", CourseRoutes);

app.use("/api/v1/contact", require("./routes/ContactUs"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
