import express from "express";
import issuesRoutes from "./routes/issues.routes";
import webhooksRoutes from "./routes/webhooks.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/issues", issuesRoutes);
app.use("/api/webhooks", webhooksRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
