var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

var IP = '127.0.0.1:3333'

router.post('/login', (req, res) => {
    console.log(req.body)
    req.body.findType = "exact"
    http.post(IP + '/admin/find', req.body).then(data => {
        console.log(data)
        if (data.length == 0) {
            res.send('fall')
        } else {
            res.send('suc')
        }
    })
})

router.get('/test', (req, res) => {
    for (let i = 0; i < 5; i++) {
        res.send('1')
    }
})


module.exports = router;
