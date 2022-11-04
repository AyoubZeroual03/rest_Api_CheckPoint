const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
myRouter = require("./routes");

const app = express();
require("./config/db").connect();

const PORT = 5001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", myRouter());

app.listen(PORT , ()=>{
    console.log(" hello");
})