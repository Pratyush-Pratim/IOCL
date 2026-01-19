const mongoose = require ('mongoose')

const chatSchema =new mongoose.Schema({
    userID : {type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true
    },
    history:[{
        role :{
            type: String,
            enum :['user','assistant'],
            required : true
        },
        text :{
            type : String
        },
        pdfPath:{
            type: String
        },
        createdAt:{
            type : Date,
            default : Date.now
        }
    }]
},{
    timestamps : true
});

module.exports = mongoose.model('chats', chatSchema)