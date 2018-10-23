import axios from 'axios';
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';
const IP = 'http://127.0.0.1:3000';
export default {
  state: {
    movies: [], //存放电影
    curpage: 1,
    rows: 5,
    maxpage: 5,
    addShow: [],
    total:5,
    page:1
  },
  mutations: {
    playing_movie(state, obj) {
      // console.log(obj.data)
      //页数！
      state.movies = obj.data.rows;
      state.curpage = obj.data.curpage;
      state.maxpage = obj.data.maxpage;
       state.total=obj.data.total
    },
    //添加的渲染
    playing_addMovies(state, obj) {
      state.addShow = obj.data;
      state.curpage = obj.data.curpage;
      state.maxpage = obj.data.maxpage;
    },
    //搜索
    playing_searchMovie(state, obj) {
      // console.log(obj)
      // console.log(state.movies)
      //不加-1什么都没有
      let data = state.movies.filter(i =>  { return i.movies[0].name.indexOf(obj.value)>-1});      
      state.movies = data;

    }
  },

  actions: {
    //获取渲染所有电影
    playing_takeData(context, obj) {
      axios.post(IP + '/playing/get_Movies', {
               page:obj.page, 
               rows:obj.rows
        })
        .then(data => {

          context.commit('playing_movie', data);
        });
      //添加电影渲染
      axios.get(IP + '/playing/showMovie', { params: {} }).then(data => {
   
        context.commit('playing_addMovies', data);
      });
    },

    //删除
    playing_delWindows(context, obj) {
      axios.post(IP + '/playing/del', { _id: obj._id }).then(data => {
        // 抓第一个调用，刷新
        context.dispatch({
          type: "playing_takeData",
          page: context.state.curpage,
          rows: context.state.rows
        });
      });
    },
    //添加
   playing_addmovie(context,obj){
    axios.post(IP+'/playing/add',{movies:[obj.data]}).then((data)=>{
        context.dispatch(
            {
                type:"playing_takeData",
                page:1,
                row:context.state.rows
            })    
    })
   }
  }
};
