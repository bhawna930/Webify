const express = require("express");
require("dotenv").config();

const dbConnect = require("./config/database");  
const userRouter = require("./routes/userRoute");
const threadRoutes = require('./routes/threadRoutes');

const app = express();

const PORT = process.env.PORT || 4888;

app.use(express.json());
app.use("/api/user", userRouter);
app.use('/api/threads', threadRoutes);
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
  });
}).catch((err) => {
  console.error("Database connection failed:", err);
});
