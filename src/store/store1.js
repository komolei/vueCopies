/**
 * test to know how to use vuex
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        count: 0,
        content: 'vuex222',
        user: {
            name: 'clc',
            age: 18
        },
        arr: [1, 2, 3, 4, 5],
    },
    getters: {
        userNmae: state => {
            return state.user.name.length != 0 ? 1 : 2;
        },
        moreThanArr: state => {
            return state.arr.filter(item => item > 3);
        },
        sum: (state, getters) => {
            return getters.userNmae === 1 ? state.content : state.count;
        }
    },
    mutations: {
        increment: (state, n) => state.count += n,
        decrement: (state, payload) => state.count -= payload.accoumt,
        changeContent: state => state.content = 'change vuex',
        get_user: (state, obj) => state.user = obj,
    },
    actions: {
        // increment(context) {
        //     context.commit('increment')
        // }
        increment1({
            commit
        }) {
            // commit('increment');
            setTimeout(() => {
                console.log("a");
                commit('increment', 222);
                // commit('changeContent');
                console.log("b");
                // 
            }, 2000);

        }
    }
})

export default store;