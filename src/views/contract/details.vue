<script setup lang="ts">
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import { contractDetail,contractOperation } from '@/api/contract';
    import ProgressBar from '@/components/ProgressBar.vue'
    import { showToast } from 'vant';
    import {userStore} from '@/store/user';
    const store:any = userStore()
    const router = useRouter()
    const contractId = router.currentRoute.value.params.id
    const state:any = reactive({
        item: '',
        loading: false
    })
    const leftBack = () => history.back();
    const gotoProgress = () => {
        router.push('/contract/progress/'+ state.item.contract_id)
    }
    const getContractDetail = async () => {
        state.loading = true
        const res:any = await contractDetail({
            id: contractId
        })
        if(res){
            state.item = res.records[0]
        }else{
            showToast(res.msg)
        }
        state.loading = false
    }
    getContractDetail()
    const putContractOperation = async (type:any) => {
        state.loading = true
        const res:any = await contractOperation({
            "is_contract_type": type, 
            "contract_id": contractId 
        })
        if(res.errCode === 200) leftBack()
        showToast(res.meg)
        state.loading = false
    }
    const refuseChange = () => {
        putContractOperation(5)
    }
    const confirmChange = () => {
        putContractOperation(3)
    }
    const sendChange = () => {
        putContractOperation(2)
    }
    
</script>
<template>
    <van-nav-bar title="合约详情" left-arrow @click-left="leftBack"/>
    <dl v-if="state.item">
        <!-- 人才端看到的是企业信息 -->
        <dd v-if="store.role == 1">
            <img :src="state.item.logo" />
            <div>
                <h5>{{state.item.company_name}}</h5>
                <p>{{state.item.create_user_name}}</p>
            </div>
        </dd>
        <!-- 企业端看到的是人才信息 -->
        <dd v-if="store.role == 3">
            <img :src="state.item.it_head" />
            <div class="small-item-text">
                <h3>{{state.item.user_name}}<i>自营</i></h3>
                <p>{{state.item.position_name}} ｜{{state.item.sex}} ｜ {{state.item.work_year}} ｜ {{state.item.highest_education}} ｜{{state.item.age}}</p>
            </div>
        </dd>
        <dt>
            <label>合约状态</label>
            <span>{{state.item.is_contract_type_text}}</span>
        </dt>
        <dt>
            <label>合约名称</label>
            <span>{{state.item.contract_name}}</span>
        </dt>
        <dt>
            <label>合约类型</label>
            <span>{{state.item.contract_type}}</span>
        </dt>
        <dt>
            <label>合约薪资</label>
            <span>{{state.item.task_salary}}</span>
        </dt>
        <dt>
            <label>合约周期</label>
            <span>{{state.item.start_cycle_time}}-{{state.item.end_cycle_time}}</span>
        </dt>
        <dt>
            <label>签约时间</label>
            <span>{{state.item.signing_time || '-'}}</span>
        </dt>
        <dt>
            <label>结薪方式</label>
            <span>{{state.item.check_out}}</span>
        </dt>
        <dt>
            <label>合约备注</label>
            <span>{{state.item.task_ask}}</span>
        </dt>
        <dt>
            <label>合约结算</label>
            <span>{{state.item.settle_salary}}</span>
        </dt>
        <dt v-if="state.item.is_contract_type!==1 && state.item.is_contract_type!==2">
            <label>合约进度</label>
            <span></span>
        </dt>
        <dt v-if="state.item.is_contract_type!==1 && state.item.is_contract_type!==2">
            <ProgressBar :item="state.item"></ProgressBar>
        </dt>
                
    </dl>
    <div class="contract-btn" v-if="state.item">
        <button class="confirm-btn" v-if="state.item.is_contract_type===1" v-debounce="sendChange">发送合约</button>
        <button class="refuse-btn" v-if="state.item.is_contract_type===2" v-debounce="refuseChange">拒绝签约</button>
        <button class="confirm-btn" v-if="state.item.is_contract_type===2" v-debounce="confirmChange">确认签约</button>
        <button class="confirm-btn" @click="gotoProgress" v-if="state.item.is_contract_type!=1 && state.item.is_contract_type!=2">合约进度</button>
    </div>
    <van-loading v-if="!state.item">加载中...</van-loading>
</template>
<style scoped>
dl{
    font-size: 0.69rem;
    color: #666666;
}
dl dd{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding: 0.85rem 0.93rem;
    margin-bottom: 1rem;
}
dl dd img{
    width: 2.67rem;
    height: 2.67rem;
    border-radius: 50%;
    margin-right: 0.75rem;
}
dl dd h5{
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-weight: 300;
    color: #333333;
    margin-bottom: 0.48rem;
}
dl dd p{
    color: #333333;
    line-height: 0.69rem;
}
dl dt{
    display: flex;
    margin-bottom: 1rem;
    padding: 0 0.72rem 0 0.56rem;
}
dl dt label{
    flex: 1;
}
dl dt span{
    text-align: right;
    color: #000000;
}
.contract-btn{
    position: fixed;
    bottom: 0.64rem;
    left: 0rem;
    width: 100%;
    display: flex;
}
.contract-btn button{
    height: 2.35rem;
    line-height: 2.23rem;
    border: 1px solid #FF9415;
    border-radius: 0.27rem;
    flex: 1;
    font-size: 0.8rem;
    text-align: center;
    margin-right: 0.64rem;
}
.contract-btn button:first-child{
    margin-left: 0.64rem;
}
.contract-btn button.refuse-btn{
    color: #FF9415;
    background: #ffffff;
}
.contract-btn button.confirm-btn{
    color: #ffffff;
    background: #FF9415;
}
.small-item-text h3{
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-weight: 300;
    color: #333333;
    margin-bottom: 0.48rem;
}
.small-item-text h3 i{
    width: 1.97rem;
    height: 0.85rem;
    line-height: 0.85rem;
    display: inline-block;
    background: linear-gradient(90deg, #FEA829, #FE8F27);
    border-radius: 1.5rem 1rem 1rem 1rem;
    font-size: 0.59rem;
    font-weight: normal;
    color: #FFFFFF;
    font-style: normal;
    text-align: center;
    margin-left: 0.64rem;
}
.small-item-text p{
    font-size: 0.69rem;
    line-height: 0.69rem;
    font-weight: 100;
    color: #333333;
}
</style>