<script setup lang="ts">
    import { inject,reactive } from 'vue';
    import { getScreenl } from '@/api/talent';
    import { talentStore } from '@/store/talent'
    import {showToast } from 'vant';
    
    const { closeScreen } = inject('popup') as any
    const store:any = talentStore()
    const state:any = reactive({
        hoghest: '',
        salary: '',
        experience: ''
    })
    const leftBack = () => closeScreen();

    const getScreenList = async () => {
        const res:any = await getScreenl()
        if(res){
            store.setScreen(res.data)
        }else{
            showToast(res.msg)
        }
    }
    const highestChange = (name:any) => {
        state.highest = name
    }
    const salaryChange = (name:any) => {
        state.salary = name
    }
    const experienceChange = (name:any) => {
        state.experience = name
    }
    const clearScreen = ()=> {
        state.hoghest = '',
        state.salary = '',
        state.experience = ''

    }
    if(!store.highestList.length) getScreenList()
</script>
<template>
    <van-nav-bar title="筛选" left-arrow @click-left="leftBack">
        <template #left>
            <van-icon name="cross" size="18" />
        </template>
    </van-nav-bar>
    <div class="task-screen">
        <h3>学历要求</h3>
        <div class="screen-item">
            <span :class="state.highest == item?'active':''" v-for="(item,index) in store.highestList" :key="index" @click="highestChange(item)">{{item.value}}</span>
        </div> 
        <h3>薪资待遇</h3>
        <div class="screen-item">
            <span  :class="state.salary == item?'active':''" v-for="(item,index) in store.salaryList" :key="index"  @click="salaryChange(item)">{{item}}</span>
        </div>
        <h3>经验要求</h3>
        <div class="screen-item">
            <span  :class="state.experience == item?'active':''" v-for="(item,index) in store.experienceList" :key="index"  @click="experienceChange(item)">{{item.value}}</span>
        </div>
    </div>
    <div class="screen-footer">
        <button class="screen-clear" @click="clearScreen">清除</button>
        <van-button type="primary" block @click="closeScreen(state)">确定</van-button>
    </div>
</template>
<style scoped>
    .task-screen{
        padding: 0 0.6rem;
    }
    .task-screen h3{
        font-size: 0.96rem;
        line-height: 0.96rem;
        font-weight: 500;
        color: #333333;
        margin: 0.8rem 0;
    }
    .task-screen span{
        width: 5.76rem;
        height: 1.6rem;
        line-height: 1.6rem;
        background: #F5F6F8;
        border: 1px solid #F5F6F8;
        border-radius: 0.16rem;
        font-size: 0.75rem;
        font-weight: 400;
        color: #666666;
        text-align: center;
        display: inline-block;
        margin: 0 0.59rem 0.51rem 0;
    }
    .task-screen span:nth-child(3n){
        margin-right: 0;
    }
    .task-screen span.active{
        color: #FF8A00;
        border: 1px solid #FE8F27;
        background: #ffffff;
    }
    .screen-footer{
        position: fixed;
        bottom: 0;
        background: #FFFFFF;
        box-shadow: 0rem 0rem 1rem 0rem rgba(208,208,208,0.39);
        padding: 0.83rem 0.64rem;
        display: flex;
        width: calc(100vw - 1.28rem);
    }
    .screen-clear{
        width: 5.33rem;
        height: 2.35rem;
        background: #F5F6F8;
        border-radius: 0.27rem;
        border: 0;
        font-size: 0.8rem;
        font-weight: bold;
        color: #666565;
        margin-right: 0.64rem;
    }
</style>
