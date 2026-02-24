const express = require('express');
const env = require('dotenv')
const mongoose = require('mongoose')

const rolesRoutes = require('./routes/roleRoute')
const usersRoutes = require('./routes/userRoutes')
const ticketRoutes =require('./routes/ticketRoute')
const ticket_comments =require('./routes/ticket_commentsRoutes')
const ticket_status_logs = require('./routes/ticket_status_logsRoutes')
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middleware/verifyToken');


const app = express()
env.config()

app.use(express.json());


app.use('/role',verifyToken,rolesRoutes)
app.use('/users',verifyToken,usersRoutes)
app.use('/tickets',verifyToken,ticketRoutes)
app.use('/ticket_comment',verifyToken,ticket_comments)
app.use('/ticket_status_log',verifyToken,ticket_status_logs)
app.use('/auth',authRoutes)

mongoose.connect(process.env.mongourl).then(()=>{
    console.log("DB connected at 3002");
}).catch((err)=>{
    console.log(err);   
})



app.listen(3002);
