const router = require('express').Router();

const { signup, getbill } = require('../controller/appController.js')


/** HTTP Reqeust */

router.get("/",(req,res)=>{
    res.send("Hello , this is Mailer end-point1")
})

router.post('/user/signup', signup);
router.post('/product/getbill', getbill);


module.exports = router;