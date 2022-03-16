<template>
    <div>
        <h3>채팅</h3>
        <hr />

        <table border="1">
            <tr v-for="tmp in state.list" :key="tmp">
                <td>{{tmp.userid}}</td>
                <td>{{tmp.username}}</td>
            </tr>
        </table>

        <input type="text" v-model="state.userid" @keyup.enter="handleSendMessage"/>
        <input type="text" v-model="state.message" @keyup.enter="handleSendMessage"/>
    </div>
</template>

<script>
import {getCurrentInstance, onMounted, reactive} from '@vue/runtime-core';
export default {
    setup () {

        const handleSendMessage = ()=>{
            // 서버로 보내기
            socket.emit('publish', {
                data: {userid: state.userid, username: state.message}
            })
        }

        onMounted(()=>{
            // 서버에서 오는 값 받기
            socket.on('subscribe', (recv) =>{
                console.log(recv)
                state.list.push(recv)
                
            })
        })

        const state = reactive({
            message: '',
            list : [],
        })
        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;
        // main.js에 담겼던 게 일로 온거임
        console.log(socket);

        return {
            state,
            handleSendMessage,
            }
    }
}
</script>

<style lang="scss" scoped>

</style>