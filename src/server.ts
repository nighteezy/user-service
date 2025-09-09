import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/userRoutes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

setupSwagger(app);

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/users", userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server runnig on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

export default app;
