

import Login from '@/views/login.vue';
import Admin from '@/views/admin.vue';
import Index from '@/views/index.vue';
import Sub from '@/views/sub.vue';
import Reg from '@/views/reg.vue';


export default [
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta:{
            title: '成绩单'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta:{
            title: '登陆'
        }
    },
    {
        path: '/reg',
        name: 'reg',
        component: Reg,
        meta:{
            title: '注册'
        }
    },
    {
        path: '/sub',
        name: 'sub',
        component: Sub,
        meta:{
            title: '考试结束'
        }
    },
    {
        path: '/index',
        name: 'index',
        component: Index,
        meta:{
            title: '考试'
        }
    },
    {
        path: '*',
        redirect: '/login'
    }
];

