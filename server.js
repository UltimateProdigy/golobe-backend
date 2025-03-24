require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const connectDb = require("./config/connectDb");
const corsOptions = require("./config/corsOptions");
const { errorHandler } = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");
const { verifyJWT } = require("./middleware/verifyJWT");
const swagger = require('./utils/swagger')
// const seedDatabase = require('./seed')

const PORT = process.env.PORT || 3500;
connectDb();
app.use(express.json());

app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
swagger(app);
// seedDatabase();


app.use("/register", require("./routes/register"));
app.use("/auth/login", require("./routes/auth/login"));
app.use("/auth/refresh-token", require("./routes/auth/refresh"));
app.use("/auth/logout", require("./routes/auth/logout"));
app.use("/api/city", require("./routes/api/city"));
app.use("/api/country", require("./routes/api/country"));
app.use("/api/hotels", require("./routes/api/hotels"));
app.use("/api/flight", require("./routes/api/flights"));

app.use(verifyJWT);
app.use("/api", require("./routes/api/bookings"));

app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ error: "404 Not Found" });
	} else res.type("txt").send("404 Not Found");
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
