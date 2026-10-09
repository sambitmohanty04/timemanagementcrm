import "dotenv/config"; // must be the first import so env vars are ready everywhere
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5001;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();