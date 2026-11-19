import "dotenv/config";
import dns from "dns";
import connectDB from "./config/db.js";
import app from "./app.js";

connectDB();

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
