import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/ai-expert-routes";

dotenv.config();

const app = express();

/**
 * ✅ 1. CORS (Production Safe)
 */
const allowedOrigins = [
  "https://edupal-ai.vercel.app",
  "https://edupal-ai-git-main-santanu-portfolio.vercel.app",
  "https://edupal-9aaegx5gx-santanu-portfolio.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * ✅ 2. Handle Preflight Requests
 */
app.options("*", cors());

/**
 * ✅ 3. Body Parser
 */
app.use(express.json());

/**
 * ✅ 4. Request Logger (IMPORTANT for debugging Render)
 */
app.use((req, res, next) => {
  console.log(`👉 ${req.method} ${req.url}`);
  next();
});

/**
 * ✅ 5. Health Check Route (VERY IMPORTANT on Render)
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend is running 🚀",
  });
});

/**
 * ✅ 6. API Routes
 */
app.use("/ai", router);

/**
 * ✅ 7. Global Error Handler (prevents silent crashes)
 */
app.use((err: any, req: any, res: any, next: any) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: err.message });
});

/**
 * ✅ 8. Start Server
 */
const port = Number(process.env.PORT) || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${port}`);
});