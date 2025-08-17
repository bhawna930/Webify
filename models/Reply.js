const mongoose=require('mongoose');

const replySchema=new mongoose.Schema({
    threadId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
        required: true
    },
    parentReplyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
       default: null
    },
    content: {
       type: String,
       required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model("Reply", replySchema);