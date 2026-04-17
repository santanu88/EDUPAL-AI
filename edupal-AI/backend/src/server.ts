import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/ai-expert-routes";
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
       origin: [
      "https://edupal-ai.vercel.app",
      "https://edupal-ai-git-main-santanu-portfolio.vercel.app",
      "https://edupal-9aaegx5gx-santanu-portfolio.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174"
    ],
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