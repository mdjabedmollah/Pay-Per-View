import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Dbconnection from "./utils/db.js";
import reviewRoute from "./routes/reviewRoutes.js";
import AuthRoute from "./routes/AuthRoute.js";
import serviceRoute from "./routes/serviceRoutes.js";
import orderRoute from "./routes/orderRoute.js";
import adminRoute from "./routes/AdminRoutes.js"
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port = process.env.PORT || 8081;

Dbconnection();

app.use(cors({ origin:"http://localhost:5173", credentials:true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", AuthRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/review", reviewRoute);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
