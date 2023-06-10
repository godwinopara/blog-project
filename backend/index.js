const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogRouter = require("./controller/blog");

const app = express();

app.use(express.json());

// ROUTER

app.use("/api/blog", blogRouter);

// PORT
const PORT = 5000;

// LISTEN TO REQUEST ON PORT 5000

app.listen(PORT, () => logger.info(`app running on port ${PORT}`));
