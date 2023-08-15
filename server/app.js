const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { dbConnect } = require("./utils/dbconnect");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/post.js");

//! CONFIG

const app = express();
dotenv.config();

// limits json file size to 5mb and allows app to read json
app.use(express.json({ limit: "5mb" }));
// protects routes
app.use(helmet());
// allows app to parse the body
app.use(bodyParser.json({ limit: "5mb" }));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cors({ orign: "*" }));

//! ROUTES
app.get("/", (req, res) =>
    res.send(
        "<center style='color: limegreen; font-family: sans-serif; font-size: 48px;'><b>Everything is working fine!</b></center>"
    )
);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);

//! CONNECTION
dbConnect().then(() => {
    const PORT = process.env.PORT || 6001;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
