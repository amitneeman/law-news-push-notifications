var express = require('express');
var router = express.Router();
let dal = require('../DAL/registerDAL');
let pushSender = require('../adapters/pushSender');
let rssAdapter = require('../adapters/rssAdapter');

/* GET users listing. */
router.post('/register', function(req, res, next) {
    let token = req.body.token;
    if(!token){
        res.json({
            error: "no token"
        }).status(401)
    }else{
        dal.registerSubscriber(token)
        res.json({
            token
        })
    }
});

router.get('/rssTest',async (req,res,next) => {
    let feed = await rssAdapter.getFeed();
    res.json(feed);
})


router.get('/send/:title/:body',async (req,res,next) => {
    let tokens = await pushSender.sendNotification(req.params.title,req.params.body,{});
    res.json(tokens);
})

module.exports = router;
