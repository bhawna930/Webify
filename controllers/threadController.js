const express=require('express');

const Thread=require('../models/Thread');
const Reply=require('../models/Reply');

exports.createThread=async(req,res)=>{
    try{
     const thread=await Thread.create(req.body);
     res.status(201).json(thread);
    }
    catch(err)
    {
       res.status(400).json({
        message: err.message
       })
    }
}

exports.deleteThreads=async(req, res)=>{
    try{
     const {id}=req.params;
     await Reply.deleteMany({
        threadId: id
     })
     await Thread.findByIdAndDelete(id);
     res.json({
        message: "Thread deleted"
     })
    }
    catch(err)
    {
        res.status(400).json({
            message: err.message
        })
    }
}


exports.getThreads=async(req, res)=>{
    try{
     const threads=await Thread.find().sort({
        createdAt: -1
     })
     res.json(threads);
    }
    catch(err)
    {
        res.status(400).json({
            message: err.message
        })
    }
}