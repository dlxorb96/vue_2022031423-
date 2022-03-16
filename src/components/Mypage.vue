<template>
    <div style="padding:20px">
        <h3>마이페이지</h3>
        <el-button size="small" @click="handleMenu(1)"  round>정보수정</el-button>
        <el-button size="small" @click="handleMenu(2)"  round>암호변경</el-button>
        <el-button size="small" @click="handleMenu(3)" round>회원탈퇴</el-button>

        
        <menu-1 v-if="menu1 === 1"></menu-1>
        <menu-2 v-if="menu1 === 2"></menu-2>
        <menu-3 v-if="menu1 === 3"></menu-3>
        
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import {useRoute} from 'vue-router'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex';
import Menu1 from './mypage/Menu1.vue'
import Menu2 from './mypage/Menu2.vue'
import Menu3 from './mypage/Menu3.vue'
import {   onMounted, computed } from '@vue/runtime-core'
export default {
    components:{
        Menu1, Menu2 , Menu3
    },
    setup () {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            menu : Number(route.query.menu)
        })

        onMounted(()=>{
            if(typeof route.query.menu === 'undefined' ){
                handleMenu(1);    
            }
            else{
                handleMenu(Number(route.query.menu));
            }
        })

        const menu1 = computed(()=>{
            return store.getters.getMenu;
        })

        
        const handleMenu = (idx)=>{
            store.commit("setMenu", idx);
            state.menu = menu1;
            router.push({name: "Mypage", query: {menu:state.menu}})
            
        }

        return {
            handleMenu,
            state,
            menu1,
            // store,
            }
    }
}
</script>

<style lang="scss" scoped>

</style>