require('dotenv').config()

const express = require("express");
const app = express();
const port = 5500;

const cors = require('cors')
app.use(cors())

// db connection
const dbConnection = require("./db/dbConfig")


// authentication middleware
const authMiddleware = require('./middleware/authMiddleware')

// user routes
const userRoutes = require("./routes/userRoute");

// question routes
const questionRoutes = require("./routes/questionRoute");

// answer routes
const answerRoutes = require("./routes/answerRoute");

// middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// register route files
app.use("/api/users", userRoutes);
app.use("/api/questions", authMiddleware, questionRoutes);
app.use("/api/answers", authMiddleware, answerRoutes);


async function start() {
    try{
        const result = await dbConnection.execute("select 'test' ")
        await app.listen(port)
        console.log("database connection established")
        console.log(`listening on ${port}`)
    }catch (error){
        console.log(error.message)
    }
}
start()

