import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { corsOptions } from "./middlewares/cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import marriageRoutes from "./routes/marriage.routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";


const app = express();

// Security Headers
app.use(helmet());

// CORS
app.use(cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter); // Apply to all API routes

// Body Parser
app.use(express.json({ limit: "10kb" })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data Sanitization against NoSQL injection
app.use(mongoSanitize());

// Prevent HTTP Parameter Pollution
app.use(hpp());


app.use("/api/marriages", marriageRoutes);



// Global Error Middleware (MUST BE LAST)
app.use(globalErrorHandler);


export default app;