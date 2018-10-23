var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

var IP = '127.0.0.1:3333'

router.get('/getplaying', (req, res) => {
    req.query.submitType = "findJoin";
    req.query.ref = ['movies', '']
    http.get(IP + '/playing/find', req.query).then(data => {
        for (let item of data.rows) {
            item.name = item.movies[0].name
            item._id = item.movies[0]._id
            item.en_name = item.movies[0].en_name
            item.movie_uptime = item.movies[0].movie_uptime
            item.movie_time = item.movies[0].movie_time
            item.style = item.movies[0].style
            item.area = item.movies[0].area
            delete item.movies
        }
        res.send(data)
    })
})

router.get('/getcineam', (req, res) => {
    req.query.submitType = "findJoin";
    req.query.ref = ['cinema', '']
    http.get(IP + '/timing/find', req.query).then(data => {
        for (let item of data) {
            item.cinema_name = item.cinema[0].cinema_name;
            item.cinema_id = item.cinema[0]._id
        }
        let cinemabox = []
        for (let item of data) {
            if (cinemabox.indexOf(item.cinema_name) == -1) {
                cinemabox.push(item.cinema_name)
            }
        }
        let cinemabox2 = []
        for (let item of cinemabox) {
            let obj = {};
            obj.cinema = item
            cinemabox2.push(obj)
        }
        for (let i of cinemabox2) {
            i.startimebox = []
            for (let item of data) {
                if (i.cinema == item.cinema_name) {
                    i.startimebox.push(item.starttime)
                    i._id = item.cinema_id
                }
            }
        }
        res.send(cinemabox2)
    })
})

router.get('/getmovietime', (req, res) => {
    let obj = {};
    obj.movies = req.query.movies;
    obj.day = req.query.day
    obj.submitType = "findJoin";
    obj.ref = ['cinema', 'hall']
    http.get(IP + '/timing/find', obj).then(data => {
        let arr = []
        for (let item of data) {
            if (req.query.cinema == item.cinema[0]._id) {
                item.hall_name = item.hall[0].hall_name;
                item.hall_id = item.hall[0]._id
                arr.push(item)
            }
        }
        res.send(arr)
    })
})

router.get('/gethall', (req, res) => {
    req.query.submitType = "findJoin";
    req.query.ref = ['hall', '']
    http.get(IP + '/cinema/find', req.query).then(data => {
        res.send(data.hall)
    })
})

router.post('/addtiming', (req, res) => {
    let obj = {};
    obj.hall = [req.body.hall]
    obj.seat = req.body.seat
    http.post(IP + '/seat/add', obj).then(seat => {
        req.body.seat = [seat]
        req.body.hall = [req.body.hall]
        req.body.cinema = [req.body.cinema]
        http.post(IP + '/timing/add', req.body).then(data => {
            res.send(data)
        })
    })
})

router.get('/getallcinema', (req, res) => {
    http.get(IP + '/cinema/find').then(data => {
        res.send(data)
    })
})

// router.get('/test', (req, res) => {
//     let obj = {}
//     obj.name = 'test'
//     obj.arr = ['unkc723ir923kfshosh']

//     console.log(obj)
//     http.post(IP + '/test/add', obj).then(data => {
//         res.send('suc')
//     })
// })

router.get('/removematch', (req, res) => {
    // console.log(req.query)
    http.get(IP + '/timing/del', { _id: req.query.timeid }).then(data => {
        http.get(IP + '/seat/del', { _id: req.query.seatid }).then(data => {
            res.send('suc')
        })
    })
})


router.get('/update', (req, res) => {
    http.post(IP + '/timing/update', req.query).then(data => {
        res.send(data)
    })
})
module.exports = router;
