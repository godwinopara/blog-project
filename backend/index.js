const app = require("./app");
const logger = require("./utils/logger");

// PORT
const PORT = 5000;

// LISTEN TO REQUEST ON PORT 5000

app.listen(PORT, () => logger.info(`app running on port ${PORT}`));
