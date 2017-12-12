import Vue from 'vue'
import Router from 'vue-router'
import animate from "animate.css";
import 'font-awesome/css/font-awesome.css'
// import HelloWorld from '@/components/HelloWorld'
// import Again from '@/components/Again'
// import Last from '@/components/last'
// import Todo from '@/components/todo'
// import LogInAndOn from '@/components/LogInAndOn'
import HelloWorld from '@/components2/HelloWorld'
import Again from '@/components2/Again'
import Last from '@/components2/last'
import Todo from '@/components2/todo'
import Toast from '@/components2/toast'
import LogInAndOn from '@/components2/LogInAndOn'
//vuex
// import Click from '@/components2/click'
// import Click2 from '@/components2/click2'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            components: {
                default: HelloWorld,
                a: LogInAndOn,
                b: Toast,
            }
        }, {
            path: '/again',
            name: 'again',
            component: Again,
        }, {
            path: '/last',
            name: 'last',
            component: Last,
        }, {
            path: '/todo',
            components: {
                default: Todo,
                a: Toast,
            }
        }, {
            path: '/LogInAndOn/',
            component: LogInAndOn,
            // children: [{
            //     path: '',
            //     component: LogInAndOn
            // }, {
            //     path: 'last',
            //     component: Last,
            // }, {
            //     path: 'todo',
            //     component: Todo,
            // }, ]
        }, {
            path: '/toast',
            name: 'toast',
            component: Toast,
        },
        //  {
        //     path: '/click2',
        //     name: 'click2',
        //     component: Click2,
        // }
    ]
})