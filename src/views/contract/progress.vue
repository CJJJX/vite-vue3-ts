<script setup lang="ts">
    import { reactive,provide } from 'vue';
    import {useRouter} from 'vue-router'
    import {  contractDetail } from '@/api/contract';
    import { userStore } from '@/store/user'
    import ProgressBar from '@/components/ProgressBar.vue'
    import ProgressEvaluation from './components/ProgressEvaluation.vue'
    import { showToast } from 'vant';
    
    const router  = useRouter()
    const contractId:any = router.currentRoute.value.params.id
    const store:any = userStore()
    const state:any = reactive({
        item: {},
        num: '',
        evaluationBool:false,
        loading: false
    })
    const leftBack = () => history.back();
    const evaluation = (num:number) => {
        state.num = num
        state.evaluationBool = true
    }
    const getContractDetail = async () => {
        state.loading = true
        const res:any = await contractDetail({
                id: contractId
        })
        if(res){
            state.item = res.records[0]
            state.loading = false
        }else{
            showToast(res.msg)
            state.loading = false
        }
    }
    const closeEvaluation = (bool:boolean) => {
        if(bool){//提交评估，重新获取详情
            getContractDetail()
        }
        state.evaluationBool = false
    }
    getContractDetail()
    provide('popup',{
        closeEvaluation
    })
</script>
<template>
    <van-nav-bar title="合约进度" left-arrow @click-left="leftBack"/>
    <h3>{{state.item.contract_name}}</h3>
    <div class="progress-bar">
        <ProgressBar :item="state.item"></ProgressBar>
        <div class="progress-bar-text">
            <span>第一阶段</span>
            <span>第二阶段</span>
            <span>第三阶段</span>
            <span>第四阶段</span>
        </div>
    </div>
    <dl>
        <dt>
            <h4>第一阶段开发进度评估<span v-if="state.item.contract_I_state===-1 && store.role!=3">暂无评估</span>
            <span v-if="state.item.contract_I_state===-1 && store.role==3" @click="evaluation(1)">去评估</span></h4>
            <p v-if="state.item.contract_I_stage">{{state.item.contract_I_stage}}</p>
        </dt>
        <dt>
            <h4>第二阶段开发进度评估<span v-if="state.item.contract_II_state===-1 && store.role!=3">暂无评估</span>
            <span v-if="state.item.contract_II_state===-1 && store.role==3" @click="evaluation(2)">去评估</span></h4>
            <p v-if="state.item.contract_II_stage">{{state.item.contract_II_stage}}</p>
        </dt>
        <dt>
            <h4>第三阶段开发进度评估<span v-if="state.item.contract_III_state===-1 && store.role!=3">暂无评估</span>
            <span v-if="state.item.contract_III_state===-1 && store.role==3" @click="evaluation(3)">去评估</span></h4>
            <p v-if="state.item.contract_III_stage">{{state.item.contract_III_stage}}</p>
        </dt>
        <dt>
            <h4>第四阶段开发进度评估<span v-if="state.item.contract_IIII_state===-1 && store.role!=3">暂无评估</span>
            <span v-if="state.item.contract_IIII_state===-1 && store.role==3" @click="evaluation(4)">去评估</span></h4>
            <p v-if="state.item.contract_IIII_stage">{{state.item.contract_IIII_stage}}</p>
        </dt>
    </dl>
    <van-loading v-if="!state.item">加载中...</van-loading>
     <!--进度弹窗-->
        <van-popup v-model:show="state.evaluationBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
            <ProgressEvaluation :num="state.num" :id="contractId"></ProgressEvaluation>
        </van-popup>
</template>
<style scoped>
 h3{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #333333;
    padding:1.2rem 0.69rem 1rem;
}
.progress-bar{
    margin: 0 0.64rem 1.17rem;
}
.progress-bar-text{
    display: flex;
}
.progress-bar-text span{
    flex: 1;
    text-align: right;
    margin: 0 1px;
    padding-top: 0.45rem;
}
dl{
    margin: 0 0.64rem;
}
dl dt{
    border: 1px solid #EDEDED;
    border-radius: 0.27rem;
    margin-bottom: 0.59rem;
    padding: 0.75rem 0.69rem;
}
dl dt h4{
    display: flex;
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 300;
    color: #666666;
}
dl dt h4 span{
    flex: 1;
    text-align: right;
    font-size: 0.64rem;
    font-weight: 500;
    color: #ACACAC;
}
dl dt h4 span.active{
    color: #FF9415;
}
dl dt p{
    font-size: 0.64rem;
    font-weight: 400;
    color: #333333;
    line-height: 0.8rem;
    margin-top: 0.77rem;
}
</style>