<template>
    <div>
        <h3>정보수정</h3>

        <el-form label-width="100px">
            <el-form-item label="변경할 이름">
                <el-input style="width: 150px" v-model="state.name"></el-input>
            </el-form-item>
            <el-form-item label="변경할 나이">
                <el-input style="width: 150px" v-model="state.age"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" size="small" @click="handleNameAndAgeUpdate">변경하기</el-button>
            </el-form-item>
        </el-form>
        

        
    </div>
</template>

<script>
import axios from 'axios'
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
    setup () {
        const state = reactive({
            name: '',
            age: '',
            
        })

        onMounted( async()=>{
            const url = `member/selectone`;
            const headers = {
                "content-type":"application/json",
                "auth" : sessionStorage.getItem("TOKEN")};
            
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status ===200){
                state.name = response.data.result.name
                state.age = response.data.result.age
            }
        })

        const handleNameAndAgeUpdate = async() =>{
            const url = '/member/update';
            const headers = {
                "content-type":"application/json",
                auth : sessionStorage.getItem("TOKEN"),
            }
            const body = {
                name: state.name,
                age : state.age,
            }
            const response = await axios.put(url, body, {headers});
            console.log(response);
            if(response.data.status ===200){
                alert("수정완료");
            }
        }

        return {
            handleNameAndAgeUpdate,
            state
            }
    }
}
</script>

<style lang="scss" scoped>

</style>