import app from "./app";
import { connectDB } from "./config/db";

const PORT: number = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    // 1️⃣ Connect Database
    await connectDB();
    console.log("Database connected successfully");

    // 2️⃣ Start Server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);  
  }
};

startServer();
