const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res) => {
	logEvents(`${err.name}: ${err.message}`, "errLog.txt");
	console.error(err.stack);
	res.status(500)
		.json({ message: "Internal Server Error" })
		.send("Something broke!");
};

module.exports = { errorHandler };
// In this example, we have a middleware function called errorHandler that takes four parameters: err, req, res, and next.
// The errorHandler function logs the error stack to the console and sends a 500 status code with the message
// "Something broke!" to the client.
