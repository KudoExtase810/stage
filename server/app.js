const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { dbConnect } = require("./utils/dbconnect");
const userRoutes = require("./routes/users.js");

//! CONFIG

const app = express();
dotenv.config();

// limits json file size to 5mb and allows app to read json
app.use(express.json({ limit: "5mb" }));
// protects routes
app.use(helmet());
// allows app to parse the body
app.use(bodyParser.json({ limit: "5mb" }));

// app.use(cors({ orign: ["htpp://localhost:5173"] }));
app.use(cors({ orign: "*" }));

app.get("/", (req, res) => res.send("Everything is working fine!"));
app.use("/users", userRoutes);

//! CONNECTION
dbConnect().then(() => {
  const PORT = process.env.PORT || 6001;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
