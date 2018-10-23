var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

var IP = '127.0.0.1:3333'

//联合查询
  router.get('/getMovies',function(req,res){
    http.get(IP+'/wait/find',{
      page:Number(req.query.page),
    rows:Number(req.query.rows),
      submitType:'findJoin',ref:['movies',''] }
    ).then((data)=>{
    // console.log(data)
      let arry = [];
      for (let item of data) {
        item.movies[0]._id = item._id
        arry.push(item.movies[0])
      }
      res.send(arry)
    })
  })

  //弹出框渲染
  router.get("/addmovie", function (req, res) {
    http.get(IP+'/movies/find',{page:Number(req.query.page),rows:Number(req.query.rows)}).then((data) =>{

      http.get(IP+'/wait/find',{}).then((newData)=>{
        console.log(newData)
        for(let i=0;i<data.length;i++){
          for(let a=0;a<newData.length;a++){
            if(data[i]._id==newData[a].movies[0]){
              data.splice(i,1)
              i--
              break
            }
          }
  
        }
         res.send(data)
      })
  
    })
  })

  //删除数据
router.post('/delmove',function(req,res){
  http.post(IP+'/wait/del',req.body).then(function(data){
    res.send(data)
  })
})
  //添加
router.post('/adds',function(req,res){
  http.post(IP+'/wait/add',req.body).then(function(data){
    res.send(data)
  })
})
module.exports = router;
