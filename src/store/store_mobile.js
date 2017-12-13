/**
 * this file for web vuejs community
 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        content: '',
        is_visible: true,
        data: [],
        tab: '',
        topic_info: {}, //话题信息
        user_info: {}, //用户的信息
        accesstoken: "",
        messages: {}, //获取已读和未读消息
        messages_count: 0, //获取未读消息数
        username: '', //固定登录之后的用户名

    },
    getters: {
        text: state => {
            return state.content.length != 0 ? "!" : "?";
        },
        new_topic_info: state => {
            let data = state.topic_info;
            console.log("new data is store is", data, "\n");
            return data;
        },
        new_user_info: state => {
            let data = state.user_info;
            console.log("new data is store is111", data, "\n");
            return data;
        },
        newHtmlById: (state) => id => {
            return state.data[id];
        },
        messages_count: state => {
            return state.messages_count; //少写个s。mmp
        },
        messages: state => state.messages,
        //stric pattern 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
        // messages: state => { 
        //     return {
        //         get: function() {
        //             return state.messages;
        //         },
        //         set: function(val) {
        //             state.messages = val;
        //         }
        //     }
        // }
    },
    mutations: {
        changeState: (state, n) => state.is_visible = n,
        changeData: (state, data) => state.data = data,
        changeTab: (state, tab) => state.tab = tab,
        changeUser: (state, user) => {
            console.log('mutations chengeuser is', user);
            console.log('mutations ', state.user_info, '\n');
            state.user_info = user;
        },
        changeTopic: (state, topic) => {
            console.log('mutations topic is', topic);
            console.log('mutations topic', state.topic_info, '\n');
            state.topic_info = topic;
        },
        changeAccesstoken: (state, accesstoken) => {
            state.accesstoken = accesstoken;
        },
        changeMessageCount: (state, count) => {
            state.messages_count = count;
        },
        changeMessage: (state, count) => {
            state.messages = count;
        }
    },
    actions: {
        changeState({
            commit
        }) {
            console.log("actions changeState");
            commit('changeState', false);
            setTimeout(() => {
                commit('changeState', true);
            }, 1000);
            return 11;
        },
        getData({
            commit
        }, userId) {
            let url = `https://www.vue-js.com/api/v1/topics?tab=${userId}`
            let msg = {};
            console.log("url:", url);
            axios.get(url).then(r => {
                commit('changeData', r.data.data);
                console.log('result is:', r.data.data);
                msg.state = 0;
            }).catch(err => (msg.state = 1));
            // return axios.get(url)
            // change use vuex save data
            // return axios.get(url)
            return msg;
        },
        getUser({
            commit
        }, username) {
            let url = `https://www.vue-js.com/api/v1/user/${username}`;
            console.log("fpoiwrepgjewgjws", url);
            axios.get(url).then(r => {
                console.log('getuser actions user is:', r.data.data);
                commit('changeUser', r.data.data);
            });
            // return axios.get(url)
            // change use vuex save data
            // return axios.get(url)
        },
        getTopic({
            commit
        }, userId) {
            console.log("getTopic user id", userId);
            let url = `https://www.vue-js.com/api/v1/topic/${userId}`;
            console.log("getTopic url is", url);
            axios.get(url).then(r => {
                commit('changeTopic', r.data.data);
            });
        },
        getMessageCount({
            commit
        }) {
            let url = `https://www.vue-js.com/api/v1/message/count?accesstoken=${this.state.accesstoken}`;
            console.log("url:", url);
            axios.get(url).then(r => {
                // this.message_count =  r.data.data;
                console.log("this.message_count", this.state.message_count, 'data', r.data.data);
                commit('changeMessageCount', r.data.data);
            });
        },
        getMessage({
            commit
        }) {
            let url = `https://www.vue-js.com/api/v1/messages?accesstoken=${this.state.accesstoken}`;
            console.log("url:", url);
            axios.get(url).then(r => {
                // this.message_count =  r.data.data;
                // console.log(this.getters.message, "this.message", this.state.messages, 'data', r.data.data, 'getter', this.getters.messages);

                commit('changeMessage', r.data.data);
                // this.getters.messages = r.data.data;
            });
        }
    },
})