const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const socketIo = require('socket.io')
const User = require('./models/model')
mongoose.Promise = global.Promise;
const http = require("http");

mongoose.connect('mongodb+srv://Ashish:user1234@cluster0-6utsm.mongodb.net/User?retryWrites=true&w=majority',{
    useNewUrlParser:true
}).then(()=>{
    console.log('Successfully connected to MongoDB')
}).catch(err => console.log(err))

const app = express();
const server = http.createServer(app);
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

require('./routes.js')(app)

const io = socketIo(server)

io.on("connection",socket => {
    socket.on('window_closed',async (user)=>{
        try {
            await User.findByIdAndRemove(user)
           .then(()=>console.log('Success'))
        }
        catch(err){
            console.log(err)
        }
    })
    socket.on('newUser',async (user) => {
        try{
            await User.findOne({_id:user}).updateOne({socketId:socket.id})
        }
        catch(err){
            console.log(err)
        }
    })
    socket.on('sent',async (user) => {
        try{
            User.findById(user)
            .then((res)=>socket.to(res.data.socketId).emit('new'))
        }
        catch(err){
            console.log(err)
        }
        })
})


app.get('/',(req,res)=>{
    res.json({'message':'Running Successfully'})
})

server.listen(process.env.PORT || 5000,()=>{
    console.log('Server running at 5000')
})