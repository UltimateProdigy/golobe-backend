const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    explorer: true,
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Golobe API",
            version: "1.0.0",
            description: "API for managing hotel and flight bookings",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3500}`,
                description: "Development server",
            },
        ],
    },
    apis: ["routes/**/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(specs);
    });
};
