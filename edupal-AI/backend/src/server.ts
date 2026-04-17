import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/ai-expert-routes";
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://edupal-ai.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

const aiRouter = router;
app.use("/ai", aiRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});