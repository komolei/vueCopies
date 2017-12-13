import Vue from 'vue'
import Router from 'vue-router'
import animate from "animate.css";
import 'font-awesome/css/font-awesome.css';
import HelloWorld from '@/components2/HelloWorld'
import Toast from '@/components2/toast'
import Todo from '@/components2/todo';
import LogInAndOn from '@/vue_components/LogInAndOn';
import Nav from '@/vue_components/nav';
import Gotop from '@/vue_components/go_top';
import Collections from '@/vue_components/collections';
import Html from '@/vue_components/html';
import Author from '@/vue_components/author';
import Newtopic from '@/vue_components/new_topic';
import Message from '@/vue_components/message';
import Userindex from '@/vue_components/user_index';
// import Topics from '@/vue_components/topics';
// import Theme from '@/vue_components/theme';
Vue.use(Router)
    // window.onscroll = Gotop.fix();
export default new Router({
    routes: [{
            path: '/',
            name: 'I',
            components: {
                default: Collections,
                go_top: Gotop,
                // author: Author,
            }
        }, {
            path: '/todo',
            name: 'todo',
            component: Todo,
        }, {
            path: '/html',
            name: 'html',
            components: {
                default: Html,
                go_top: Gotop,
                // author: Author,
                // topics: Topics,
                // theme: Theme,
            }
        }, {
            path: '/newTopic',
            name: 'newTopic',
            component: Newtopic
        }, {
            path: '/topic',
            name: 'topic',
            components: {
                default: Html,
                // go_top: Gotop,
                // author: Author,
                // topics: Topics,
                // theme: Theme,
            }
        }, {
            path: '/message',
            name: 'message',
            component: Message,
        }, {
            path: '/userIndex',
            name: 'userIndex',
            component: Userindex,
        }
        // children: [{
        //     path: '',
        //     components: {
        //         default: Html,
        //         a: Author
        //     }
        // }]

    ]
})