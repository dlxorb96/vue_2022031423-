<template>
    <div v-if="state.items">
        <h3>anminview</h3>
          <el-select  v-model="state.items._id" class="m-2" placeholder="대분류">
                <el-option
                v-for="(item) in state.items"
                :key="item"
                :label="item._id"
                :value="item._id"
                @click="handleCode1(item)"
                />
            </el-select>

        <el-table :data="state.items" style="width: 100%" border>
            <el-table-column type="index" width="60px" label="번호" />
            <el-table-column prop="_id" label="대분류코드" />
            <el-table-column prop="count" label="전체개수"  />
            <el-table-column prop="pricetotal" label="가격합계" />
            <el-table-column prop="quantity" label="수량합계" />
            
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
import { reactive } from '@vue/reactivity'
import { onMounted, getCurrentInstance } from '@vue/runtime-core'
export default {
    setup () {

        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;
        console.log(socket);
        const state = reactive({

        })
        const handleCode1 = async(idx)=>{
            console.log(idx)
            // state.aa = idx
            // state.items = idx
            // await handleData();
        }

        const handleData= async()=>{
            const url ='item/groupcode1';
            const headers = {"Content-type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response);
            if(response.data.status ===200){
                state.items = response.data.result;
            }
        }
        onMounted(()=>{
            handleData();
            socket.on('subscribe', (revc) =>{
                console.log(revc)
                if(revc.username === 'insert'){
                    handleData()
                }
            })
        })

        return {
            state,
            handleCode1,
            handleData,}
    }
}
</script>

<style lang="scss" scoped>

</style>