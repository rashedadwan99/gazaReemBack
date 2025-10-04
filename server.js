require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
