import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Dbconnection from "./utils/db.js";

import AuthRoute from "./routes/AuthRoute.js";
import serviceRoute from "./routes/serviceRoutes.js";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8081;

Dbconnection();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", AuthRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/order", orderRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
