require("dotenv").config()
var express = require("express")
const app = express();
const userRouter = require("./api/users/user.router");
const businesspermitRouter = require("./api/businesspermit/businesspermit.router");
const cors = require("cors");
var timeout = require('connect-timeout');
app.use(cors())
app.use(express.json());
app.use(timeout('600s'));
app.use("/users", userRouter);
app.use("/businesspermit", businesspermitRouter);

// app.get("/api" , (req, res)  => 
// {
// res.json({
//     success: 1,
//     message: 'This api is now working'
// })
// })


app.listen(process.env.APP_PORT, () => 
{
    console.log(`Server up and running port ${process.env.APP_PORT}`);
})