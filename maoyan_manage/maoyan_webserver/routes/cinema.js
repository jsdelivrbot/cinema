var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

var IP = '127.0.0.1:3333'
//正常加载
router.post('/get_cinema_list', function (req, res, next) {
    let obj = req.body
    obj.page = Number(req.body.page);
    obj.rows = Number(req.body.rows)
    http.get(IP + '/cinema/find', obj).then(function (data) {
        res.send(data);
    })
});
//删除影院
router.post('/dele_cinema_list', function (req, res, next) {
    //先删除影院的信息
    let _id = req.body._id
    http.get(IP + '/cinema/del', { _id: _id }).then(function (data) {
        //判断影院中的影厅是否只有一条，如只有一条需要将其转化成字符串
        if (req.body.ids.length == 1) {
            let newid = req.body.ids[0]
            http.get(IP + '/hall/del', { _id: newid }).then(function (data) {
                res.send(data);
                return
            })
        }
        //非一条数据，直接上传ids删除
        http.get(IP + '/hall/del', { ids: req.body.ids }).then(function (data) {
            res.send(data);
        })
    })

});

//增加
router.post('/add_cinema', function (req, res, next) {
    let obj = {
        submitType: 'addMore',
        data: req.body.halls
    }
    http.post(IP + '/hall/add', obj).then(function (data) {
        let obj2 = {
            cinema_name: req.body.cinema_name,
            address: req.body.address,
            tag: req.body.tag,
            hall: data
        }
        http.post(IP + '/cinema/add', obj2).then(function (data) {
            res.send(data);
        })
    })
});
//修改
router.post('/get_fix_cinema', function (req, res, next) {
    let obj = req.body
    obj.submitType = 'findJoin'
    obj.ref = ['hall', '']

    http.post(IP + '/cinema/find', obj).then(function (data) {
        res.send(data);
    })
});
//删除已增加的影厅
router.post('/fix_del_hall', function (req, res, next) {
    //先删除影院里面的id
    let obj = { _id: req.body._id1 }
    http.post(IP + '/cinema/find', obj).then(function (data) {
        for (let i = 0; i < data.hall.length; i++) {
            if (data.hall[i] == req.body._id) {
                data.hall.splice(i, 1)
            }
        }
        obj.hall = data.hall
        //删除后重新发给影院更新
        http.post(IP + '/cinema/update', obj)
    })
    //删除对应的影厅
    let obj2 = { _id: req.body._id }
    http.post(IP + '/hall/del', obj2).then(function (data) {
        res.send(data);
    })
});
//提交更新
router.post('/fix_cinema_info', function (req, res, next) {

    //更新影院信息
    let c_obj = req.body.cinema
    c_obj._id = req.body._id
    http.post(IP + '/cinema/update', c_obj)

    //有id只需更新的影厅
    let h_fix_obj = []
    for (let item of req.body.hall) {
        if (item._id)
            h_fix_obj.push(item)
    }
    for (let item of h_fix_obj) {
        http.post(IP + '/hall/update', item)
    }
    //无id需新增的影厅
    let h_add_obj = []
    for (let item of req.body.hall) {
        if (!item._id)
            h_add_obj.push(item)
    }
    //多条增加至影厅，push进cinema
    if (h_add_obj.length != 0 && h_add_obj.length != 1) {
        let obj = {
            submitType: 'addMore',
            data: h_add_obj
        }
        http.post(IP + '/hall/add', obj).then(function (data) {
            let obj2 = {
                isPush: true,
                _id: req.body._id
            }
            for (let item of data) {
                //push进cinema
                obj2.hall = item
                http.post(IP + '/cinema/update', obj2)
            }
            res.send(data);
        })
    }
    //如果是一条
    if (h_add_obj.length == 1) {
        http.post(IP + '/hall/add', h_add_obj[0]).then(function (data) {
            let obj3 = {
                isPush: true,
                _id: req.body._id,
                hall: data
            }
            http.post(IP + '/cinema/update', obj3).then(function (data) {
                res.send(data);
            })
        })
    }

});
module.exports = router;
