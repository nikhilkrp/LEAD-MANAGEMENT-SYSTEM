import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import leadRoutes from "./routes/leadRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"


dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

connectDB();
app.use(cors({
  origin: process.env.CLIENT_URL,
  // origin:"http://localhost:5173", Local Host
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());



// routes
app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("hello g")
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})