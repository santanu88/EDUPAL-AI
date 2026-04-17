import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/ai-expert-routes";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: [
      "https://edupal-ai.vercel.app",
      "https://edupal-ai-git-main-santanu-portfolio.vercel.app",
      "https://edupal-9aaegx5gx-santanu-portfolio.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());
app.use("/ai", router)

const port = Number(process.env.PORT) || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});