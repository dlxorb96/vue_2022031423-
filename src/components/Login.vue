<template>
    <div style="padding:20px">
        <h3>로그인</h3>
        <el-form  label-width="60px">
            <el-form-item label="아이디">
                <el-input style="width: 150px" ref="idref" v-model="state.id"></el-input>
            </el-form-item>
            <el-form-item label="암호">
                <el-input type="password" ref="pwref" style="width: 150px" v-model="state.password"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" size="small" @click="handleLogin">로그인</el-button>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import axios from 'axios';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default {
    setup () {
        const store = useStore();
        const router = useRouter();
        // 빈 ref 객체 생성
        const idref = ref(null);
        const pwref = ref(null);

        const state = reactive({
            id: '',
            password : '',
        })
        const handleLogin = async()=>{
            if(state.id.length <= 0 ){
                alert("아이디를 입력하세요");
                idref.value.focus();
                return false;
            }

            if(state.password.length <= 0 ){
                alert("암호를 입력하세요");
                pwref.value.focus();
                return false;
            }

            const url = '/member/selectlogin';
            const headers = {"content-type":"application/json"};
            const body = {
                id: state.id,
                password : state.password
            }
            const response = await axios.post(url, body, {headers});
            console.log(response)
            if(response.data.status ===200){
                alert("로그인성공")
                sessionStorage.setItem("TOKEN", response.data.result);
                // store.commit("메소드명",변경할 값)
                store.commit("setLogged", true);
                router.push({name: "Home"});
            }
            else{
                alert("로그인실패");
            }
        }

        return { 
            state,
            idref,
            pwref,
            handleLogin
            }
    }
}
</script>

<style lang="scss" scoped>

</style>