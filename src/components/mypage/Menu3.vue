<template>
    <div>
        <h3>회원탈퇴</h3>

        <el-form label-width="100px">
            <el-form-item label="현재암호">
                <el-input type="password" style="width: 150px" v-model="state.password"></el-input>
            </el-form-item>
            <el-form-item label="암호확인">
                <el-input type="password" style="width: 150px" v-model="state.password1"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" size="small" @click="handledelete">탈퇴하기</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity'
// import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
export default {
    setup () {
        const router = useRouter();
        // const store = useStore();
        const state = reactive({
            password:'',
            password1:'',
        })
        const handledelete = async() =>{
            const url = 'member/delete';
            const headers = {
                "content-type": "application/json",
                auth : sessionStorage.getItem("TOKEN"),
            }
            const body = {
                password : state.password,
                

            }
            const response = await axios.delete(url, {headers: headers, data:body});
            console.log(response)
            if(response.data.status ===200){
                alert("삭제완료");
                
                
                router.push({name: "Logout"});
            }
        }

        return {
            handledelete,
            state
            }
    }
}
</script>

<style lang="scss" scoped>

</style>