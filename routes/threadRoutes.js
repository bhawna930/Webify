const express=require('express');
const router=express.Router();
const threadController=require('../controllers/threadController');

router.post("/",threadController.createThread);
router.delete("/:id", threadController.deleteThreads);
router.get("/", threadController.getThreads);

module.exports=router;