<script setup lang="ts">
    import { inject,reactive } from 'vue';
    import { positionTypeList } from '@/api/task';
    import { taskStore } from '@/store/task'
    import { showToast } from 'vant';
    
    const { closePositionType } = inject('popup') as any
    const store:any = taskStore()
    const state = reactive({
        typeKey: 0
    })
    const leftBack = () => closePositionType();
    const setTypeKey = (key:any) => {
        state.typeKey = key
    }
    const getPositionList = async () => {
        const res:any = await positionTypeList()
        if(res){
            store.setPositionList(res)
        }else{
            showToast(res.msg)
        }
    }
    if(store.positionList.length<=0) getPositionList()
</script>
<template>
    <van-nav-bar title="职位类型" left-arrow @click-left="leftBack"/>
    <div class="position-type">
        <div class="position-type-left">
            <h5 :class="state.typeKey==index?'active':''" v-for="(item, index) in store.positionList" :key="index" @click="setTypeKey(index)">{{item.name}}</h5>
        </div>
        <div class="position-type-right">
            <span v-for="(item, index) in store.positionList[state.typeKey] && store.positionList[state.typeKey].children" :key="index" @click="closePositionType(item.name)">{{item.name}}</span>
        </div>
    </div>
</template>
<style scoped>
    .position-type{
        display: flex;
    }
    .position-type-left{
        width: 4.77rem;
        height: calc(100vh - 46px);
        background: #F6F6F6;
    }
    .position-type-left h5{
        width: 4.77rem;
        height: 2.4rem;
        line-height: 2.4rem;
        background: #F6F6F6;
        border-bottom: 1px solid #ffffff;
        font-size: 0.75rem;
        font-weight: 300;
        color: #333333;
        text-align: center;
    }
    .position-type-left h5.active{
        background: #EFEFEF;
    }
    .position-type-right{
        padding: 0.8rem 0 0 0.6rem;
    }
    .position-type-right span{
        width: 6.61rem;
        height: 2.03rem;
        line-height: 2.03rem;
        background: #FFFFFF;
        border: 1px solid #E9E9E9;
        border-radius: 0.11rem;
        font-size: 0.75rem;
        font-weight: 300;
        color: #666666;
        text-align: center;
        margin-right: 0.59rem;
        margin-bottom: 0.64rem;
        display: inline-block;
    }
    .position-type-right span:nth-child(2n){
        margin-right: 0px;
    }
</style>