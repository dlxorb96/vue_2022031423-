<template>
    <div>
        <h3>암호변경</h3>

        <el-form label-width="100px">
            <el-form-item label="현재암호">
                <el-input type="password" style="width: 150px" v-model="state.password"></el-input>
            </el-form-item>
            <el-form-item label="변경할 암호">
                <el-input type="password" style="width: 150px" v-model="state.password1"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" size="small" @click="handlePwUpdate">변경하기</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {useStore} from 'vuex';
import axios from 'axios'
import {useRouter} from 'vue-router';
import { reactive } from '@vue/reactivity'
export default {
    setup () {
        const store = useStore()
        const router = useRouter()
        
        const state = reactive({
            password : '',
            password1 : ''
        })
        const handlePwUpdate = async()=>{
            const url = '/member/updatepw';
            const headers = {
                "content-type":"application/json",
                auth : sessionStorage.getItem("TOKEN")
            }
            const body = {
                password : state.password,
                password1 : state.password1
            }
            const response = await axios.put(url, body, {headers});
            console.log(response)
            if(response.data.status ===200){
                alert("수정완료");
                store.commit("setMenu", 1)
                router.push({name: "Mypage", query:{menu: 1}});
            }
        }

        return {state, handlePwUpdate}
    }
}
</script>

<style lang="scss" scoped>

</style>