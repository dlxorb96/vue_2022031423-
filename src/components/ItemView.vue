<template>
    <div v-if="state.items">
        <h3>아이템뷰</h3>
        <hr />

        <el-form  label-width="60px">
            <el-form-item label="코드">
                <el-input style="width: 150px" placeholder="000-000-000" v-model="state.code"></el-input>
            </el-form-item>
            <el-form-item label="이름">
                <el-input style="width: 150px" v-model="state.name"></el-input>
            </el-form-item>
            <el-form-item label="가격">
                <el-input style="width: 150px" v-model="state.price"></el-input>
            </el-form-item>
            <el-form-item label="수량">
                <el-input style="width: 150px" v-model="state.quantity"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" size="small" @click="handleInsert">등록하기</el-button>

        <hr />

        <el-table :data="state.items" style="width: 100%" border>
            <el-table-column prop="_id" label="아아디" />
            <el-table-column prop="code1" label="대분류"  />
            <el-table-column prop="code2" label="중분류" />
            <el-table-column prop="code3" label="소분류" />
            <el-table-column prop="name" label="이름" />
            <el-table-column prop="price" label="가격" />
            <el-table-column prop="quantity" label="수량" />
            <el-table-column prop="regdate" label="등록일자" />
            
        </el-table>

    </div>
</template>

<script>
import axios from 'axios'
import { reactive } from '@vue/reactivity'
import { onMounted, getCurrentInstance } from '@vue/runtime-core';
export default {
    setup () {
        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;
        console.log(socket);
        const state = reactive({
            code: '',
            name: '',
            price: '',
            quantity: '',
        });

        const handleInsert = async() =>{
            const url = 'item/insert';
            const headers = {"content-type":"application/json"};
            const body = {
                code1: state.code.split('-')[0],
                code2: state.code.split('-')[1],
                code3: state.code.split('-')[2],
                name : state.name,
                price : state.price,
                quantity : state.quantity,
            }
            const response = await axios.post(url, body ,{headers});
            console.log(response);
            if(response.data.status ===200){
                // 이 위치에서 등록했음을 통지해야함
                socket.emit('publish', {data: {userid: 'aaa', username:'insert'}})

                // alert("등록성공")
                await handleData();
                
            }
        }

        onMounted(()=>{
            handleData()
            
        })

        const handleData = async() =>{
            const url = 'item/select';
            const headers = {"content-type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response);
            if(response.data.status ===200){
                state.items = response.data.result;
            }
        }
        return {
            state,
            handleData,
            handleInsert
            }
    }
}
</script>

<style lang="scss" scoped>

</style>