const mongoose = require('mongoose');

const User = mongoose.Schema({
    text:[],
},{
    timestamps:true
})
module.exports = mongoose.model('User',User)