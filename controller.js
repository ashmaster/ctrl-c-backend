const User = require('./models/model.js');

exports.create = (req,res) => {
    const user = new User({
       text:[]
    })

    user.save().then((data)=>{
        res.send(data)
    }).catch(err=> res.status(500).send({
        'message':'Some error occurred'
    })
    )
}

exports.findOne = (req,res) => {
    User.findById(req.params.userId)
    .then((user)=>{
      if(!user){
          return res.status(400).send({
              "message":"User not found"
          })
      }  
      res.send(user)
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
}

exports.delete = (req,res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user=>{
        if(!user){
            return res.status(400).send({
                "message":"No Such User"
            })
        }
        res.send({"message":"User deleted successfully"})
    })
    .catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.noteId
        });
    });
}

exports.addText = (req,res) =>{
    User.update({_id:req.params.userId},{$push:{text:req.body.text}})
    .then((user)=>res.send(user))
    .catch(err => res.status(500).send(err))
}