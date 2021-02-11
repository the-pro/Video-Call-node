const express = require('express')

const { v4: uuidV4 } = require('uuid')
const router = express.Router();


router.route('/').get(
    (req,res,next)=>{
        res.render('index.ejs');

    }
)

router.route('/create').post(
    (req,res,next)=>{
        console.log(req.body)
        res.status=200;
        res.send(JSON.stringify({
            roomID:uuidV4(),
            username:req.username
        }));

    }
)

module.exports=router;