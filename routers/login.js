const express = require('express')

const { v4: uuidV4 } = require('uuid')
const router = express.Router();


router.route('/').get(
    (req,res,next)=>{
        res.render('en.ejs');

    }
)

router.route('/create').post(
    (req,res,next)=>{
        res.redirect(`/${uuidV4()}`)
    }
)

router.route('/:roomid').get(
    (req,res,next)=>{
        // console.log("try");
        // res.render('room', { roomId: req.params.room },(err,html)=>{
        //     res.send(html);
        // })
        res.status=200;
        res.send(JSON.stringify({roomID:req.params.roomid}));
    }
)

module.exports=router;