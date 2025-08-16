const mongoose=require('mongoose');

const Reply=require('../models/Reply');

exports.addReply=async(req, res)=>{
    try{
     const reply=await Reply.create(req.body);
     res.status(201).json(reply);
    }
    catch(err)
    {
        res.status(400).json({
            message: err.message
        })
    }
}
exports.getReplies=async(req, res)=>{
    try{
      const{threadId, parentReplyId=null, page=1}=req.query;
      const limit=3;
      const skip=(page-1)*limit;

      const replies=await Reply.find({threadId, parentReplyId})
      .sort({createdAt: -1})
      .skip(skip)
      .limit(limit);

      res.json(replies);
    }
    catch(err)
    {
        res.status(400).json({
            message: err.message
        })
    }
}