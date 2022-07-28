require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler.middleware");
const notFoundMiddleware = require("./middleware/not-found.middleware");

// middleware
app.use(express.json());

// error handler
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(url);

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
