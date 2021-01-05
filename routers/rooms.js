const express = require('express')

const router = express.Router();

router.route('/:room').get(
    (req,res,next)=>{
        console.log("try");
        res.render('room', { roomId: req.params.room })
    }
)

module.exports=router;