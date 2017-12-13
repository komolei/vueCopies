import Vue from 'vue'
import Router from 'vue-router'
import animate from "animate.css";
import 'font-awesome/css/font-awesome.css';
import HelloWorld from '@/components2/HelloWorld'
import Toast from '@/components2/toast'
// import Todo from '@/components2/todo';
import LogInAndOn from '@/mobile/LogInAndOn';
import Nav from '@/mobile/nav';
import Gotop from '@/mobile/go_top';
import Collections from '@/mobile/collections';
import Html from '@/mobile/html';
import Author from '@/mobile/author';
import Newtopic from '@/mobile/new_topic';
import Message from '@/mobile/message';
import Userindex from '@/mobile/user_index';
// import Topics from '@/mobile/topics';
import Theme from '@/mobile/theme';
import Vuetify from 'vuetify'
import Todo from '@/mobile/todo';

// index.js or main.js
import ('../../node_modules/vuetify/dist/vuetify.min.css')
Vue.use(Vuetify)
Vue.use(Router)
    // window.onscroll = Gotop.fix();
export default new Router({
    routes: [{
            path: '/',
            name: 'I',
            components: {
                default: Nav,
                go_top: Gotop,
                // author: Author,
            }
        }, {
            path: '/loginandon',
            name: 'loginandon',
            component: LogInAndOn,
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
        }, {
            path: '/theme',
            name: 'theme',
            component: Theme,
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