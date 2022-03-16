import { createRouter , createWebHashHistory } from 'vue-router'

import Home from '@/components/Home';
import Login from '@/components/Login';
import Logout from '@/components/Logout';
import Mypage from '@/components/Mypage';
import Join from '@/components/Join';
import Chat from '@/components/ChatView';

const routes = [
    {path: '/', redirect: '/home'},
    {path: '/home', name: "Home", component: Home},
    {path: '/login', name: "Login", component: Login},
    {path: '/logout', name: "Logout", component: Logout},
    {path: '/mypage', name: "Mypage", component: Mypage},
    {path: '/join', name: "Join", component: Join},
    {path: '/chat', name: "Chat", component: Chat},
]

const router = createRouter({
    history : createWebHashHistory(),
    routes : routes
})

export default router;