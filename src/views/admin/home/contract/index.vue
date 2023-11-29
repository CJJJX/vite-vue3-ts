<script setup lang="ts">
    import {reactive} from 'vue'
    import {adminContractList,adminContractConfirm} from '@/api/admin'
    import { showToast } from 'vant';
    import Tabs from '@/components/Tabs.vue'
    import ProgressBar from '@/components/ProgressBar.vue'
    import {useRouter} from 'vue-router'
    const router = useRouter()
    const leftBack = () => history.back();
    const tabs = [
        {
            type: 0,
            text: '全部'
        },
        {
            type: 3,
            text: '履约中'
        },
        {
            type: 4,
            text: '已完成'
        }
    ]
    const state:any = reactive({
        loading: false,
        type: 0,
        contractList: [],
        bool: false,
        selectType: 0,
        selectId: 0
    })
    const setTabList = (type:any) => {
        if(type === state.type) return
        state.type = type
        getContractList()
    }
    const getContractList = async () => {
        state.loading = true
        const res:any = await adminContractList({
            is_contract_type: state.type
        })
        if(res){
            state.contractList = res.records
        }else{
            showToast(res.msg)
        }
        state.loading = false
    } 
    const contractStateText = (num:Number) => {
        return num === 1?'正常':num === 2?'有风险':'问题严重'
    }
    const contractState = (item:any) => {
        var str = '正常'
        if(item.contract_IIII_state>0) {
            return contractStateText(item.contract_IIII_state)
        }else if(item.contract_III_state>0) {
            return contractStateText(item.contract_III_state)
        }else if(item.contract_II_state>0) {
            return contractStateText(item.contract_II_state)
        }else if(item.contract_I_state>0) {
            return contractStateText(item.contract_I_state)
        }
        return str
    }
    const completeContract = (item:any) => {
        state.selectType = 4
        state.selectId = item.contract_id
        state.bool = true
    }
    const overContract = (item:any) => {
        state.selectType = 5
        state.selectId = item.contract_id
        state.bool = true
    }
    const contractConfirm = async () => {
        const res = await adminContractConfirm({
            "is_contract_type": state.selectType, // 4合约完成 5合约终止
            "contract_id": state.selectId
        })
        if(res){
            getContractList()
        }
        state.bool = false
    }
    const gotoDetail = (id:Number) =>{
        router.push('/contract/details/'+id)
    }
    getContractList()
</script>
<template>
<div class="wy-admin-page">
    <van-nav-bar title="合约管理" left-arrow @click-left="leftBack"/>
    <Tabs :tabs="tabs" @tabsCall="setTabList"></Tabs>
    <van-pull-refresh v-model="state.loading" @refresh="getContractList">
        <div class="home-contract-list" v-for="(item,index) in state.contractList" :key="index" >
            <dl @click="gotoDetail(item.contract_id)">
                <dt>
                    <h3>{{item.contract_name}}</h3>
                </dt>
                <dt>
                    <label>公司名称：</label>
                    <span>{{item.company_name}}</span>
                </dt>
                <dt>
                    <label>任务薪资：</label>
                    <span>{{item.task_salary}}/个</span>
                </dt>
                <dt>
                    <label>合约周期：</label>
                    <span>{{item.start_cycle_time.replaceAll('-','.')}}-{{item.end_cycle_time.replaceAll('-','.')}}</span>
                </dt>
                <dt class="wy-flex">
                    <label>合约进度：</label>
                    <ProgressBar :item="item"></ProgressBar>
                </dt>
            </dl>
            <div class="home-contract-bottom">
                <div :class="contractState(item)==='有风险'?'orange':contractState(item)==='问题严重'?'red':''">
                    <i></i>
                    <span>{{contractState(item)}}</span>
                </div>
                <button v-if="item.is_contract_type === 3" @click="completeContract(item)">完成合约</button>
                <button v-if="item.is_contract_type === 3" @click="overContract(item)">终止合约</button>
            </div>
        </div>
        <van-loading v-if="state.loading">加载中...</van-loading>
        <div class="wy-no-data" v-if="!state.loading && state.contractList.length==0">暂无数据</div>
    </van-pull-refresh>
    <van-popup v-model:show="state.bool" closeable round :style="{ width: ' 13.07rem',height: '9.75rem' }">
        <div class="admin-contract-popup">
            <h5>温馨提示</h5>
            <p v-if="state.selectType === 4">当前合约进度已正常完成， <br/>完成合约进行后续薪资发放。</p>
            <p v-if="state.selectType === 5">当前合约进度存在异常， <br/>经双方沟通决定终止合约。</p>
            <button @click="contractConfirm()">确定</button>
        </div>
    </van-popup>
</div>
</template>
<style scoped>
    .admin-contract-popup{
        padding: 1.4rem 1rem;
    }
    .admin-contract-popup h5{
        font-size: 0.85rem;
        line-height: 0.85rem;
        margin-bottom: 0.8rem;
        font-weight: 400;
        color: #333333;
        text-align: center;
    }
    .admin-contract-popup p{
        font-size: 0.8rem;
        font-weight: 400;
        color: #333333;
        line-height: 1.28rem;
        text-align: center;
        margin-bottom: 0.76rem;
    }
    .admin-contract-popup button{
        width: 10.99rem;
        height: 1.92rem;
        background: #FE9215;
        border: 0px solid #FF6F00;
        border-radius: 0.16rem;
        font-size: 0.85rem;
        line-height: 1.92rem;
        text-align: center;
        font-weight: 400;
        color: #FFFFFF;
        border: none;
    }
    .home-contract-bottom{
        border-top: 1px solid #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0.6rem 0 0 0.2rem;
    }
    .home-contract-bottom div{
        width: 8rem;
    }
    .home-contract-bottom div.orange i{
        background: #FE9215;
    }
    .home-contract-bottom div.orange span{
        color: #FE9215;
    }
    .home-contract-bottom div.red i{
        background: #FF0000;
    }
    .home-contract-bottom div.red span{
        color: #FF0000;
    }
    .home-contract-bottom div i{
        width: 0.37rem;
        height: 0.37rem;
        background: #50D400;
        border-radius: 50%;
        display: inline-block;
    }
    .home-contract-bottom div span{
        font-size: 0.64rem;
        line-height: 0.64rem;
        font-weight: 400;
        color: #50D400;
        margin-left: 0.32rem;
    }
    .home-contract-bottom button{
        width: 4rem;
        height: 1.39rem;
        background: #FE9215;
        border-radius: 0.16rem;
        font-size: 0.69rem;
        line-height: 1.39rem;
        text-align: center;
        font-weight: 100;
        color: #FFFFFF;
        border: none;
    }
    .wy-admin-page{
        background: #f6f6f6;
        height: 100vh;
        overflow: auto;
    }
    .wy-flex{
        display: flex;
        align-items: center;
    }
    .home-contract-list{
        background: #FFFFFF;
        border-radius: 0.53rem;
        margin: 0 0.59rem 0.53rem;
        padding: 0.88rem 0.48rem 0.64rem;
    }
    .contract-progress{
        flex: 1;
    }
    dl{
    }
    dl dt{
        margin-bottom: 0.51rem;
    }
    dl dt h3{
        font-size: 0.91rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 0.91rem;
        margin-bottom: 0.83rem;
    }
    dl dt label{
        font-size: 0.69rem;
        line-height: 0.69rem;
        font-weight: 300;
        color: #666666;
    }
    dl dt span{
        font-size: 0.69rem;
        line-height: 0.69rem;
        font-weight: 300;
        color: #333333;
    }
</style>