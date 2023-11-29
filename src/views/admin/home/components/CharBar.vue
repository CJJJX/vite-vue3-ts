<script setup lang="ts">
    import {reactive,inject,onMounted} from 'vue'
    const echarts:any = inject('echarts')
    const props:any = defineProps({
        data:{
            type: Object
        }
    })
    const state = reactive({
        option: {
//   legend: {},
  tooltip: {},
  grid: {
    top: '10%',
    left: '3%',
    right: '3%',
    bottom: '5%',
    containLabel: true
        },
  dataset: {
    source: [
      ['product', '人才', '企业'],
      ['周一', 43.3, 85.8],
      ['周二', 83.1, 73.4],
      ['周三', 86.4, 65.2],
      ['周四', 72.4, 53.9],
      ['周五', 72.4, 53.9],
      ['周六', 72.4, 53.9],
      ['周日', 72.4, 53.9]
    ]
  },
  xAxis: { type: 'category',
  axisLine: {
    show: false
    },
    axisTick: {
    show: false
    },
 },
  yAxis: {},
  series: [
      { type: 'bar',
      barWidth: '10',
      itemStyle:{
        color: '#6dadea'
        }
     },
      { type: 'bar',
      barWidth: '10',
      itemStyle:{
        color: '#fbc605'
        }
     }
    ]
}
    })      
    onMounted(()=>{
        state.option.dataset.source = []
        state.option.dataset.source[0]=['product',props.data.talent.name,props.data.company.name]
        for(var i = 0;i<props.data.title.length;i++){
            state.option.dataset.source.push([props.data.title[i],props.data.talent.data[i],props.data.company.data[i]])
        }
         // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chartBar'));
        // 绘制图表
        myChart.setOption(state.option);
        // 图表响应式
        window.addEventListener('resize',()=>{
            myChart.resize()
        })
    })
</script>
<template>
    <div id="chartBar"></div>
</template>
<style scoped>
    #chartBar{
        height: 11.63rem;
        background: #fff;
        border-radius: 0.27rem;
        width: 100%;
    }
</style>
