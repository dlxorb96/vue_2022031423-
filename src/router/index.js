import { createRouter , createWebHashHistory } from 'vue-router'

import Home from '@/components/Home';
import Login from '@/components/Login';
import Logout from '@/components/Logout';
import Mypage from '@/components/Mypage';
import Join from '@/components/Join';
import Chat from '@/components/ChatView';
import Admin from '@/components/AdminView';
import Admin1 from '@/components/Admin1View';
import Item from '@/components/ItemView';

const routes = [
    {path: '/', redirect: '/home'},
    {path: '/home', name: "Home", component: Home},
    {path: '/login', name: "Login", component: Login},
    {path: '/logout', name: "Logout", component: Logout},
    {path: '/mypage', name: "Mypage", component: Mypage},
    {path: '/join', name: "Join", component: Join},
    {path: '/chat', name: "Chat", component: Chat},
    {path: '/admin', name: "Admin", component: Admin},
    {path: '/admin1', name: "Admin1", component: Admin1},
    {path: '/item', name: "Item", component: Item},
]

const router = createRouter({
    history : createWebHashHistory(),
    routes : routes
})

export default router;