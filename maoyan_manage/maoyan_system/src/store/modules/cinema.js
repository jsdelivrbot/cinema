import axios from 'axios'
import { start } from 'repl';
let ip = 'http://127.0.0.1:3000'

export default {
    state: {
        cinema_list: [],
        hall_list: [],
        nowpage: 1,
        maxpage: 0,
        rows: 5,
        fix_list: [] 
    },
    mutations: {
        save_cl(state, obj) {
            state.cinema_list = obj.rows;
            state.nowpage = obj.curpage;
            state.maxpage = obj.maxpage;
        },
        after_del(state, obj) {
            state.cinema_list = state.cinema_list;
            state.nowpage = obj.curpage;
            state.maxpage = obj.maxpage;
        }
    },
    actions: {
        get_cinema_list(context, obj) {
            let newobj = { page: obj.page, rows: context.state.rows }
            newobj[obj.con] = obj.text
            axios.post(ip + "/cinema/get_cinema_list", newobj).then((msg => {
                context.commit('save_cl', msg.data)
            }))
        },
        delete_cinema(context, obj) {
            let newobj = { _id: obj._id, ids: obj.ids }
            axios.post(ip + "/cinema/dele_cinema_list", newobj).then((msg => {
                context.dispatch({
                    type: 'get_cinema_list',
                    page: context.state.nowpage,
                    rows: context.state.rows,
                })
            }))
        },
        add_cinema(context, obj) {
            let all_obj = {
                cinema_name: obj.cinema.name,
                address: obj.cinema.address,
                tag: obj.cinema.checkboxGroup,
                halls: obj.hall
            }
            axios.post(ip + "/cinema/add_cinema", all_obj).then((msg => {
                context.dispatch({
                    type: 'get_cinema_list',
                    page: context.state.nowpage,
                    rows: context.state.rows,
                })
            }))
        },
        fix_cinema(context, obj) {
            delete obj.type
            axios.post(ip + "/cinema/fix_cinema_info", obj)
            // .then((msg => {
            //     context.dispatch({
            //         type: 'get_cinema_list',
            //         page: context.state.nowpage,
            //         rows: context.state.rows,
            //     })
            // }))
        }
    }
}