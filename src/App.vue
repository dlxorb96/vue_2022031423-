<template>
    <div>
        <h3>앱뷰</h3>
        {{logged}}
        <el-button @click="handleMenu('home')">Home</el-button>
        <el-button v-if="!logged" @click="handleMenu('login')">login</el-button>
        <el-button v-if="!logged" @click="handleMenu('join')">join</el-button>
        <el-button v-if="logged" @click="handleMenu('mypage')">mypage</el-button>
        <el-button v-if="logged" @click="handleMenu('logout')">logout</el-button>
        <el-button  @click="handleMenu('admin')">admin</el-button>
        <el-button  @click="handleMenu('admin1')">admin1</el-button>
        <el-button  @click="handleMenu('item')">item</el-button>
        <el-button  @click="handleMenu('chat')">chat</el-button>
        <hr />
        
        <router-view></router-view>
    </div>
</template>

<script>

import {useRouter} from 'vue-router';
import { useStore } from 'vuex';
import { computed , onMounted } from '@vue/runtime-core';

export default {
    setup () {
        const router = useRouter();
        const store = useStore()
        
        const logged = computed(()=>{
            return store.getters.getLogged
        })

        const handleMenu = (menu) =>{
            console.log("app.vue => handleMenu" , menu);
            router.push(menu);
        }

        // 생명주기가 반응하기 위해서는 (F5, refresh가 수행됨)
        onMounted(()=>{
            if(sessionStorage.getItem("TOKEN") !== null) {
                store.commit('setLogged', true);
            }
            else{
                store.commit('setLogged', false);
            }
        })
        

        return {
            handleMenu,
            logged
            }
    }
}
</script>

<style lang="scss" scoped>

</style>