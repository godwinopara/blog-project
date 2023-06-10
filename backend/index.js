const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

const app = express();

const PORT = 5000;

app.listen(PORT, () => logger.info(`app running on port ${PORT}`));
