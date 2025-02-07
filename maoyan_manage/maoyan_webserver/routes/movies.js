var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
var multiparty = require('multiparty');
var util = require("util");

var IP = '127.0.0.1:3333'

//初始化获取数据 getMovies_house
router.get('/movies_init_movies', function (req, res, next) {
    req.query.page = Number(req.query.page)
    req.query.rows = Number(req.query.rows)

    http.post(`${IP}/movies/find`, req.query).then(function (data) {
        res.send(data)
    })
});


//搜索 searchMovies
router.get('/searchMovies', function (req, res, next) {
    let obj = {
        page: Number(req.query.page),
        rows: Number(req.query.rows)
    };

    obj[req.query.name] = req.query.text;

    http.post(`${IP}/movies/find`, obj).then(function (data) {
        res.send(data)
    })
});

//删除 movies_Delete
router.get('/movies_Delete', function (req, res, next) {
    http.post(`${IP}/movies/del`, { _id: req.query.id }).then(function (data) {
        res.send(data)
    });
    http.post(`${IP}/timing/del`, { movies: req.query.id }).then(function (data) {
        res.send(data)
    });
    http.post(`${IP}/playing/del`, { movies: req.query.id }).then(function (data) {
        res.send(data)
    });
    http.post(`${IP}/wait/del`, { movies: req.query.id }).then(function (data) {
        res.send(data)
    });
});

//增加 addMovies
router.post('/addMovies', function (req, res, next) {
console.log(req.body)
    http.post(`${IP}/movies/add`, req.body).then(function (data) {
        res.send(data)
    })
});
//修改 upMovies
router.post('/upMovies', function (req, res, next) {
    console.log(req.body)
        http.post(`${IP}/movies/update`,req.body).then(function (data) {
            res.send(data)
        })
    });





//上传视频
router.post('/movies_add_video', function (req, res, next) {
    let url = "video";
    upload(req, res, url)
})


//电影首图 movies_add_headimg
router.post('/movies_add_headimg', function (req, res, next) {
    let url = "movie_img_head";
    upload(req, res, url)
})
//导演图片 movies_add_director_img
router.post('/movies_add_director_img', function (req, res, next) {
    let url = "director_img";
    upload(req, res, url)
})
//演员照片
router.post('/movies_add_actors_img', function (req, res, next) {
    let url = "actor_imgs";
    upload(req, res, url)
})
//剧照
router.post('/movies_add_imgbox', function (req, res, next) {
    let url = "img_box";
    upload(req, res, url)
})






function upload(req, res, url){
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: `./public/images/${url}` });  
    //文件路径可以修改，如果修改记得和下面的路径保持一致

    //    //上传完成后处理
    form.parse(req, function (err, fields, files) {

        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var files = files.file;
        }

        //发送第一张图片的信息
        let str = files[0].path;


        let path=str.replace(/public/, '')

         let ret=path.replace(/\\/g,"/")
        // 发送消息回去
        res.send(ret);
    })
}



//猫眼小程序






module.exports = router;
