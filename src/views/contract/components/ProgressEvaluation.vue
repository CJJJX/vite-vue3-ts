<script setup lang="ts">
  import { showToast } from 'vant'
  import {inject,reactive} from 'vue'
  import {contractGradeEdit} from '@/api/contract'
  const {closeEvaluation} = inject('popup') as any
  const state:any = reactive({
    value: '',
    evalType: ''
  })
  const props = defineProps({
    num: {
        type: String as any
    },
    id: {
        type: String 
    }
  })
  const setProgressGrade = async () =>{
    if(!state.evalType){
        showToast('请选择评估状态')
        return
    }
    if(!state.value){
        showToast('请输入具体描述')
        return
    }
    const res = await contractGradeEdit({
        "contract_state": state.evalType,
        "contract_stage": state.value,
        "contract_id": props.id,
        "num": props.num
    })
    if(res){
        showToast('评估成功')
        closeEvaluation(true)
    }else{
        showToast('评估失败')
    }
  }
  const evalTypeClick = (type:any) => {
    state.evalType = type
  }
  const numText = ["零","一","二","三","四"]
</script>
<template>
    <van-nav-bar title="进度评估" left-arrow @click-left="closeEvaluation(false)"/>
    <div class="eval-cont">
        <h3>第{{numText[props.num]}}阶段</h3>
        <p>
            <span @click="evalTypeClick(1)" :class="state.evalType == 1?'active':''">通过</span>
            <span @click="evalTypeClick(2)" :class="state.evalType == 2?'active':''">有风险</span>
            <span @click="evalTypeClick(3)" :class="state.evalType == 3?'active':''">问题严重</span>
        </p>
        <van-field
            v-model="state.value"
            rows="8"
            autosize
            label=""
            type="textarea"
            maxlength="500"
            placeholder="具体描述"
            show-word-limit
            class="eval-field"
        />
    </div>
    <button class="wy-submit" @click="setProgressGrade()">提交评估</button>
</template>
<style scoped>
    .wy-submit{
        position: static;
    }
    .eval-field{
        border: 1px solid #D5D3D3;
        margin-bottom: 1.49rem;
    }
    .eval-cont{
        padding: 1.28rem 0.56rem;
    }
    h3{
        font-size: 0.8rem;
        line-height: 0.8rem;
        font-weight: 500;
        color: #333333;
        margin-bottom: 0.88rem;
    }
    p{
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.8rem;
    }
    p span{
        width: 5.92rem;
        height: 1.41rem;
        text-align: center;
        line-height: 1.41rem;
    }
    p span:nth-child(1){
        background: #ffffff;
        border: 1px solid #50D400;
        color:#50D400;
    }
    p span:nth-child(1).active{
        background: #50D400;
        color:#ffffff;
    }
    p span:nth-child(2){
        background: #ffffff;
        border: 1px solid #FE9215;
        color: #FE9215;
    }
    p span:nth-child(2).active{
        background: #FE9215;
        color:#ffffff;
    }
    p span:nth-child(3){
        background: #ffffff;
        border: 1px solid #FF0000;
        color: #FF0000;
    }
    p span:nth-child(3).active{
        background: #FF0000;
        color:#ffffff;
    }
</style>