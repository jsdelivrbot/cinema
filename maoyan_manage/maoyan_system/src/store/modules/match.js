
import axios from 'axios'

export default {
    state: {
        playingdata: [],
        ip: 'http://127.0.0.1:3000',
        playingrows: 5,
        playingpage: 1,
        playingtotal: 0,
        playingmaxpage: 0,
        movie_cinema: [],
        movie_day: '',
        cinematime: [],
        hallbox: [],
        cinemabox: [],
    },
    mutations: {
        match_getplayingdata(state, data) {
            let obj = data.obj
            // console.log(obj)
            state.playingdata = obj.rows
            state.playingtotal = obj.total
        },
        match_getmoviecinema(state, data) {
            let newarr = [...data.cinemabox]
            console.log(newarr)
            state.movie_cinema = newarr
        },
        match_changeday(state, data) {
            state.movie_day = data.day
        },
        match_cinematime(state, data) {
            let newarr = [...data.arr]
            state.cinematime = newarr
            // console.log(state.cinematime)
        },
        match_getselecthall(state, data) {
            let newarr = [...data.arr]
            state.hallbox = newarr
            // console.log(state.hallbox)
        },
        match_getallcinemabox(state, data) {
            let newarr = [...data.arr]
            state.cinemabox = newarr
        },
        match_changepage(state, data) {
            state.playingpage = data
            this.dispatch('match_getplaying')
        }
    },
    actions: {
        match_getplaying(context) {
            axios.get(context.state.ip + '/match/getplaying', { params: { page: context.state.playingpage, rows: context.state.playingrows } }).then(data => {

                context.commit({ type: 'match_getplayingdata', obj: data.data })
            })
        },
        match_getcineam(context, data) {
            let obj = { movies: data.movies_id }
            if (context.state.movie_day != '') {
                obj.day = context.state.movie_day
            }
            axios.get(context.state.ip + '/match/getcineam', { params: obj }).then(data => {
                context.commit({ type: 'match_getmoviecinema', cinemabox: data.data })
            })
        },
        match_getmovietime(context, data) {
            delete data.type
            // console.log(data)
            axios.get(context.state.ip + '/match/getmovietime', { params: data }).then(data => {
                context.commit({ type: 'match_cinematime', arr: data.data })
            })
        },
        match_gethall(context, data) {
            delete data.type
            // console.log(data)
            axios.get(context.state.ip + '/match/gethall', { params: data }).then(data => {
                context.commit({ type: 'match_getselecthall', arr: data.data })
            })
        },
        match_addtiming(context, data) {
            delete data.type
            // console.log(data.obj)
            let movies_id = data.obj.movies
            axios.post(context.state.ip + '/match/addtiming', data.obj).then(data => {
                context.dispatch({
                    type: 'match_getcineam',
                    movies_id
                })
            })
        },
        match_getallcinema(context) {
            axios.get(context.state.ip + '/match/getallcinema').then(data => {
                context.commit({ type: 'match_getallcinemabox', arr: data.data })
            })
        },
        match_remove(context, data) {
            delete data.type;
            // console.log(data)
            axios.get(context.state.ip + '/match/removematch', { params: data }).then(data => {
                // console.log(data.data)
            })
        },
        match_update(context, data) {
            delete data.type
            console.log(data)
            axios.get(context.state.ip + '/match/update', { params: data }).then(data => {

            })
        }
    }
}