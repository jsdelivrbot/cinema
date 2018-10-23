var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

var IP = '127.0.0.1:3333'

//获取当前热映的信息
router.post('/get_Movies',function(req,res){
  console.log(req.body)
  http.post(IP+'/playing/find',{
    page:Number(req.body.page),
    rows:Number(req.body.rows),
    submitType:'findJoin',ref:['movies',''] }
  ).then((data)=>{

  res.send(data)
  })
})
//添加热映电影显示的数据
router.get('/showMovie',function(req,res){
  http.get(IP+'/movies/find',req.query).then((data)=>{
    //==============de-weight
    http.get(IP+'/playing/find',{}).then((newData)=>{
      console.log(newData)
      for(let i=0;i<data.length;i++){
        for(let j=0;j<newData.length;j++){
          if(data[i]._id==newData[j].movies[0]){
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
//删除每一条信息
router.post('/del',function(req,res){
  http.post(IP+'/playing/del',req.body).then(function(data){
    res.send(data)
  })
})

//添加
router.post('/add',function(req,res){
  http.post(IP+'/playing/add',req.body).then(function(data){
    console.log(data)
    res.send(data)
  })
})

module.exports = router;
