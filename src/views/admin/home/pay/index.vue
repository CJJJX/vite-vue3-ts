<script setup lang="ts">
    import {reactive} from 'vue'
    import {adminContractList,adminPayConfirm} from '@/api/admin'
    import { showToast } from 'vant';
    const leftBack = () => history.back();
    const state:any = reactive({
        loading: false,
        type: 0,
        contractList: [],
        bool: false,
        selectType: 0,
        selectId: 0
    })
    const getContractList = async () => {
        state.loading = true
        const res:any = await adminContractList({
            is_contract_type: 4
        })
        if(res){
            state.contractList = res.records
        }else{
            showToast(res.msg)
        }
        state.loading = false
    } 
    const selectContract = (item:any) => {
        state.selectId = item.contract_id
        state.bool = true
    }
    const contractConfirm = async () => {
        const res = await adminPayConfirm({
            "contract_id": state.selectId
        })
        if(res){
            showToast('发薪完成')
            getContractList()
        }
        state.bool = false
    }
    getContractList()
</script>
<template>
<div class="wy-admin-page">
    <van-nav-bar title="发薪管理" left-arrow @click-left="leftBack"/>
    <van-pull-refresh class="pay-list-top" v-model="state.loading" @refresh="getContractList">
        <div class="home-contract-list" v-for="(item,index) in state.contractList" :key="index" >
            <dl>
                <dt>
                    <h3>
                        {{item.user_name}}
                        <i v-if="item.settle_salary">已完成</i>
                        <i v-else>审核中</i>
                    </h3>
                </dt>
                <dt>
                    <label>合约名称：</label>
                    <span>{{item.contract_name}}</span>
                </dt>
                <dt>
                    <label>薪资发放：</label>
                    <span>{{item.task_salary}}/个</span>
                </dt>
                <dt>
                    <label>合约周期：</label>
                    <span>{{item.start_cycle_time.replaceAll('-','.')}}-{{item.end_cycle_time.replaceAll('-','.')}}</span>
                </dt>
                <dt class="wy-flex">
                    <label>合约状态：</label>
                    <span>完成</span>
                </dt>
            </dl>
            <div class="home-contract-bottom">
                <button v-if="!item.settle_salary" @click="selectContract(item)">发放薪资</button>
                <button v-else class="opacity">发放薪资</button>
            </div>
        </div>
        <van-loading v-if="state.loading">加载中...</van-loading>
        <div class="wy-no-data" v-if="!state.loading && state.contractList.length==0">暂无数据</div>
    </van-pull-refresh>
    <van-popup v-model:show="state.bool" closeable round :style="{ width: ' 13.07rem',height: '8.75rem' }">
        <div class="admin-contract-popup">
            <h5>温馨提示</h5>
            <p>确定将合约薪资发放吗？</p>
            <button @click="contractConfirm()">确定</button>
        </div>
    </van-popup>
</div>
</template>
<style scoped>
    .pay-list-top{
        margin-top: 0.64rem;
    }
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
        justify-content: flex-end;
        padding:0.6rem 0 0 0.2rem;
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
    .home-contract-bottom button.opacity{
        opacity: 0.3;
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
    dl dt h3 i{
        font-size: 0.64rem;
        line-height: 0.64rem;
        font-weight: 400;
        color: #FE9215;
        font-style: normal;
        float: right;
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