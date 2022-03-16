<template>
    <div style="padding: 20px;">
        <h3>회원가입</h3>

        <el-form  label-width="100px">
            <el-form-item label="아이디">
                <el-input style="width: 250px"  @keyup="handleIDCHK" v-model="state.id"></el-input>
                <span style="margin-left: 20px">{{state.chk}}</span>
            </el-form-item>
            <el-form-item label="암호">
                <el-input type="password" style="width: 250px" v-model="state.pw"></el-input>
            </el-form-item>
            <el-form-item label="암호확인">
                <el-input type="password" style="width: 250px" v-model="state.pw1"></el-input>
            </el-form-item>
             <el-form-item label="이름">
                <el-input style="width: 250px" v-model="state.name"></el-input>
            </el-form-item>
             <el-form-item label="이메일">
                <el-input style="width: 250px" v-model="state.email"></el-input>
            </el-form-item>
             <el-form-item label="나이">
                <el-input style="width: 250px" v-model="state.age"></el-input>
            </el-form-item>
             <el-form-item label="">
                <el-button type="primary" size="small" @click="handleJoin">회원가입</el-button>
            </el-form-item>
        </el-form>
        

        <!-- 아이디: <input type="text" v-model="state.id" @keyup="handleIDCHK"><br/>
        
        암호:<input type="text" v-model="state.pw"><br/>
        암호확인: <input type="text" v-model="state.pw1"><br/>
        이름:<input type="text" v-model="state.name"><br/>
        이메일<input type="text" v-model="state.email"><br/>
        나이<input type="text" v-model="state.age"><br/>
        <button @click="handleJoin">회원가입</button> -->
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
import axios from 'axios';
import { reactive } from '@vue/reactivity';
export default {
    setup () {
        const router = useRouter()
        const state = reactive({
            id:'',
            pw:'',
            pw1:'',
            name:'',
            email:'',
            age: '',
            chk: '중복확인'
        })
        
        const handleIDCHK = async() =>{
            console.log(state.id)
            if(state.id.length > 0 ){
                const url = `/member/idcheck?id=${state.id}`;
                const headers = {"Content-type": "application/json"};
                const response = await axios.get(url, headers);
                console.log(response)
                if(response.data.status === 200){
                    state.chk = '사용불가'
                }
                else{state.chk = '사용가능'}
            }
            else{
                state.chk = '중복확인';
            }
            
        }
        const handleJoin = async ()=>{
            const url = '/member/insert';
            const headers = {"Content-type": "application/json"};
            const body = {
                id: state.id,
                name: state.name,
                password : state.pw,
                email : state.email,
                age : state.age,
            }
            const response = await axios.post(url,body, {headers});
            console.log(response);
            if(response.data.status === 200){
                alert('회원가입 완료');
                router.push({name: "Home"});

            }
        }
        

        return {
            handleJoin,
            handleIDCHK,
            state
            }
    }
}
</script>

<style lang="scss" scoped>

</style>