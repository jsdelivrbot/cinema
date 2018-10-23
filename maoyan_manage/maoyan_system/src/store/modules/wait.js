import axios from 'axios';
const IP = 'http://127.0.0.1:3000';
export default {
    state: {
        emps: [],
        newPage: 1,
        maxPage: 0,
        movies: [],
        total: 0,
        totals: 0,

    },
    mutations: {
        changeEmps(state, obj) {
            state.emps = obj.data;
            state.maxPage = obj.data.maxpage;
            state.newPage = obj.data.curpage;
            state.totals = obj.data.total;
        },
        movieEmps(state, obj) {
            state.maxPage = obj.movie.maxpage;
            state.newPage = obj.movie.curpage;
            state.movies = obj.movie.rows;
            state.total = obj.movie.total;
        },
        //搜索
        searchMovie(state, obj) {
            let data = state.emps.filter(i => !!~i.name.indexOf(obj.value));
            // console.log(data)
            state.emps = data;
        }
    },
    actions: {
        //获取渲染所有电影
        refreshEmps(context, obj) {
            axios.get(IP + '/wait/getMovies', {
                page: obj.page,
                rows: obj.rows
            })
                .then(data => {
                    context.commit('changeEmps', data);
                });
            //添加电影
            axios.get(IP + '/wait/addmovie', {
                params: {
                    page: obj.page,
                    rows: obj.rows
                }
            }).then(
                function (res) {
                    //   console.log(res.data)
                    context.commit(
                        {
                            type: 'movieEmps',
                            movie: res.data,
                        },
                        //  console.log(res.data),
                        //  console.log(obj.rows),
                        //  console.log(obj.page),
                        //  console.log(obj),
                    )
                }
            )
        },
        //添加
        addmovies(context, obj) {
            //    let movies =[];
            //    for(let i =0;i<=obj.data.length;i++){
            //       movies:obj.data[i]
            //    }
            //    console.log(movies)
            axios.post(IP + '/wait/adds', { movies: [obj.data] }).then((data) => {
                context.dispatch(
                    {
                        type: "refreshEmps",
                        page: 1,
                        rows: context.state.rows
                    })
            })
        },

        //删除
        delmove(context, obj) {
            axios.post(IP + '/wait/delmove', { _id: obj._id }).then(data => {
                context.dispatch({
                    type: "refreshEmps",
                    page: 1,
                    rows: context.state.rows
                });
            });
        },
    },
}