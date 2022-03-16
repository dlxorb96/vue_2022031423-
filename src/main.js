import { createApp } from 'vue'
import App from './App.vue'
import routes from './router/index.js';
import axios from 'axios';
import stores from './stores/index.js';


//element-plus 설정
import 'element-plus/theme-chalk/index.css';
import ElementPlus from 'element-plus';

// npm i --socket.io => 벡엔드
// npm i --socket.io-client@4.4.1 => 프런트
import io from 'socket.io-client';
const socket = io("/", {transports:['websocket'], path:'/socket'});



const app = createApp(App);
app.config.globalProperties.$socket = socket;
// 컴포넌트에서 사용가능하도록 설정

app.use(routes);
app.use(ElementPlus);
app.use(stores);
app.config.globalProperties.axios = axios;

app.mount('#app');









// //2. 여기에 필요한 라이브러리 설정하기
// app.use(ElementPlus)
// app.use(stores)
// app.config.globalProperties.axios = axios;
// app.use(CKEditor)
// app.use(VMdEditor);

// //3. 마운트
// app.mount('#app')

