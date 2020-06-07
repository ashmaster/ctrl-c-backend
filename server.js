const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://Ashish:user1234@cluster0-6utsm.mongodb.net/User?retryWrites=true&w=majority',{
    useNewUrlParser:true
}).then(()=>{
    console.log('Successfully connected to MongoDB')
}).catch(err => console.log(err))

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

require('./routes.js')(app)

app.get('/',(req,res)=>{
    res.json({'message':'Running Successfully'})
})

app.listen(process.env.PORT || 5000,()=>{
    console.log('Server running at 3000')
})