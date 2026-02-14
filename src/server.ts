import app from "./app";
import { connectDB } from "./config/db";

const PORT: number = Number(process.env.PORT) || 3000;

const startServer = async (): Promise<void> => {
  try {
    // 1️⃣ Connect Database
    await connectDB();

    const currentTime = new Date().toLocaleTimeString()
    // 2️⃣ Start Server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}` , currentTime);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
