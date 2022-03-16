<template>
    <div>
        <h3>admin1</h3>
        <div style="width: 500px">
        <vue3-chart-js v-bind="barChart" ref="chartRef"></vue3-chart-js>
        </div>
    </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { onMounted, reactive, getCurrentInstance } from '@vue/runtime-core';
import axios from 'axios'
import {ref} from '@vue/reactivity';
export default {
    components:{
        Vue3ChartJs
    },
    setup () {
        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;
        console.log(socket);
        const state = reactive({
            
        })
        const chartRef = ref(0)
        const handleData = async()=>{
            const url = 'item/groupcode1';
            const headers = {"content-type":"application/json"};
            const response = await axios.get(url, {headers});
            // console.log(response);
            if(response.data.status===200){
                for(let i =0; i < response.data.result.length; i++){
                    // console.log(response.data.result)
                    barChart.data.labels[i] = response.data.result[i]._id
                    barChart.data.datasets[0].data[i] = response.data.result[i].count
                    barChart.data.datasets[1].data[i] = response.data.result[i].pricetotal
                    barChart.data.datasets[2].data[i] = response.data.result[i].quantity
                    barChart.data.datasets[0].backgroundColor[i] = backgroundColor[Math.floor(Math.random() *9) ]
                    barChart.data.datasets[1].backgroundColor[i] = backgroundColor[Math.floor(Math.random() *9) ]
                    barChart.data.datasets[2].backgroundColor[i] = backgroundColor[Math.floor(Math.random() *9) ]
                    // console.log(i);
                }
                console.log(barChart)
                chartRef.value.update(200);
                
            }
        }
        const backgroundColor = ["#1abc9c", "#f1c40f", "#2980b9", "#2ecc71", "#e67e22", "#9b59b6", "#2ecc71", "#e67e22", "#9b59b6"]
        const barChart = {
            type: "bar",
            options: {
            },
            data: {
                labels: ["A", "B", "C"],
                datasets: [
                {
                    label: "전체개수",
                    backgroundColor: [],
                    data: [],
                },
                {
                    label: "가격합계",
                    backgroundColor: [],
                    data: [],
                },
                {
                    label: "수량합계",
                    backgroundColor: [],
                    data: [],
                },
                ],
            },
        };
        onMounted(()=>{
            handleData()
            socket.on('subscribe', (revc) =>{
                console.log(revc)
                if(revc.username === 'insert'){
                    handleData()
                }
            })
        })

        return {
            chartRef,
            state,

            barChart,
            }
    }
}
</script>

<style lang="scss" scoped>

</style>