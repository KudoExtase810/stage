const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { dbConnect } = require("./utils/dbconnect");

const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const DAMRoutes = require("./routes/DAM");
const SJRoutes = require("./routes/SJ");
const caseRoutes = require("./routes/cases");

const { isSJ } = require("./middlewares/auth");

//! CONFIG

const app = express();
dotenv.config();

// limits json file size to 5mb and allows app to read json
app.use(express.json({ limit: "5mb" }));
// protects routes
app.use(helmet());
// allows app to parse the body
app.use(bodyParser.json({ limit: "5mb" }));

app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }));
// app.use(cors({ orign: "*" }));

//! ROUTES
app.get("/", (req, res) =>
    res.send(
        "<center style='color: limegreen; font-family: sans-serif; font-size: 48px;'><b>Everything is working fine!</b></center>"
    )
);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/forms/DAM", DAMRoutes);
app.use("/forms/SJ", isSJ, SJRoutes); // role middleware applied here
app.use("/cases", caseRoutes);

//! CONNECTION
dbConnect().then(() => {
    const PORT = process.env.PORT || 6001;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
