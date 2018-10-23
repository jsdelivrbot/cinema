import axios from "axios"
import { isObject } from "util";


export default {
    state: {
        IP: 'http://127.0.0.1:3000',
        //电影
        movies: [],
        newPage: 1,
        maxPage: 0
    },
    mutations: {
        test(state) {
            state.count += 1
        }
    },
    //------------------------------------------------mutations
    mutations: {
        //初始化电影
        InitMovies(state, obj) {
            state.movies =obj.rows;
            state.maxPage = obj.maxpage;
            state.newPage = obj.curpage;
        },

    },
    //------------------------------------------------actions
    actions: {
        //初始化获取数据
        movies_init_movies(context, obj) {
            axios.get(context.state.IP + "/movies/movies_init_movies", { params: { page: obj.page, rows: obj.rows } }).then(data => {
                circle(data.data.rows)
                context.commit("InitMovies", data.data)
            });
        },
        //搜索
        movies_searchMovies(context, obj) {
            delete obj.type;
            axios.get(context.state.IP + "/movies/searchMovies", { params: obj }).then(data => {
                circle(data.data.rows)
                context.commit("InitMovies", data.data)
            });
        },
        //删除
        movies_Delete(context, obj) {
             console.log(obj)
            axios.get(context.state.IP + "/movies/movies_Delete", { params: { id: obj.id } }).then(data => {
                context.dispatch({
                    type: "movies_init_movies",
                    page: obj.page,
                    rows: obj.rows
                })
            })
        },

        //增加
        addMovies(context, obj) {
            star(obj.data);
            axios.post(context.state.IP + "/movies/addMovies", obj.data).then(data => {
                 //    console.log(data)
            });
        },
        //修改 upMovies
        upMovies(context, obj) {
            star(obj.data);
            console.log(obj.data)
            axios.post(context.state.IP + "/movies/upMovies", obj.data).then(data => {
                
                    console.log(data.data)
             });

        },

    },



}


//循环导演和演员信息
function circle(rows) {
    for (let i = 0; i < rows.length; i++) {
        rows[i].actor_name = '';
        rows[i].actor_img = '';
        rows[i].actor_playing = '';

        rows[i].director_name = rows[i].director.name;
        rows[i].director_img = rows[i].director.img;
        rows[i].director_playing = rows[i].director.playing;

        for (let j = 0; j < rows[i].actors.length; j++) {
            rows[i].actor_name += rows[i].actors[j].name + ","
            rows[i].actor_img += rows[i].actors[j].img + ","
            rows[i].actor_playing += rows[i].actors[j].playing + ","
        }

    }
}
//将主演提出来
function star(movies){
    movies.movie_star = "";
    for (let i = 0; i < movies.actors.length; i++) {
        if (i < 3) {
            movies.movie_star += movies.actors[i].name + ','
        }
    }
}