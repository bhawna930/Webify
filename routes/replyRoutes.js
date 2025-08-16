const express=require('express');
const router=express.Router();
const replyController=require('../controllers/replyController');

router.post("/", replyController.addReply);
router.get("/", replyController.getReplies);

module.exports=router;