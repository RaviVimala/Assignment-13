//express setup
const express = require("express");

const mongoose = require('mongoose');
const route = require("./SRC/Routes/route.js");

//App setup
const app = express();
// const PORT = process.env.PORT || 3040;   // it may give like this for PORT number

//Middleware
app.use(express.json());

//Mongo DB Connection
mongoose.connect("mongodb://localhost:27017/")
.then(() => console.log("Mongo DB Connected"))
.catch(err => console.log('Database Connection Error : ', err));

//Router path
app.use('/Task', route);


//404 error handler message
app.use((req, res) => {
    res.status(404).json({message: "Endpoint router not found"});
});

//PORT NO
const PORT = 3040 || 4000;
//Server listening PORT
app.listen(PORT, () => {
    console.log(`Server is Listening on the PORT : ${PORT}`);
});