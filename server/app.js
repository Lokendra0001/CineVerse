require('dotenv').config()
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require("cors")
const connectMongoDB = require('./libs/mongooseConnection');
const userRouter = require('./routes/user_route');
const moviesRouter = require('./routes/movies_route');
const bookingRouter = require('./routes/booking_route');

const app = express();
const PORT = 3000;

connectMongoDB("mongodb://127.0.0.1:27017/MovieHub")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const allowedOrigin = ["http://localhost:5173"];
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))


app.get("/", (req, res) => {
    res.send("HELLO FROM SERVER!")
})

app.use('/user', userRouter)
app.use('/movie', moviesRouter)
app.use('/booking', bookingRouter)


app.listen(PORT, () => console.log(`Server Started At ${PORT} `))