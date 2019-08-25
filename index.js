const express = require("express");
const bodyParser = require("body-parser");
const EmailController = require("./controllers/email_controller");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/api/email", EmailController.sendEmail);

app.use((err, req, res, next) => {
  res.status(422).send({ errors: err.message });
});

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "127.0.0.1";

console.log("Listening on", HOST, PORT);
app.listen(PORT, HOST);
module.exports = app;
