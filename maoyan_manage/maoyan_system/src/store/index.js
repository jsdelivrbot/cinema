import Vuex from 'vuex'
import Vue from 'vue';
import axios from 'axios'

import user from './modules/user'
import cinema from './modules/cinema'
import movies from './modules/movies'
import order from './modules/order'
import playing from './modules/playing'
import wait from './modules/wait'
import match from './modules/match'



Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        cinema,
        movies,
        order,
        playing,
        wait,
        match
    },
    state: {
        islogin: true
    },
    mutations: {
        changelogin(state) {
            state.islogin = true
        },
        changelogin2(state) {
            state.islogin = false
        }
    }
})