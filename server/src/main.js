import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: process.env.DEV_DOMAIN }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
