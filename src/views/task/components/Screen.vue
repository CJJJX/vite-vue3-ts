<script setup lang="ts">
    import { inject,reactive } from 'vue';
    import { screenList } from '@/api/task';
    import { taskStore } from '@/store/task'
    import { showToast }   from 'vant';
    
    const { closeScreen } = inject('popup') as any
    const store:any = taskStore()
    const state:any = reactive({
        mode: '',
        cycle: ''
    })
    const leftBack = () => closeScreen();
    const getScreenList = async () => {
        const res:any = await screenList()
        if(res){
            store.setScreenList(res.data)
        }else{
            showToast(res.msg)
        }
    }
    const modeChange = (name:any) => {
        state.mode = name
    }
    const cycleChange = (name:any) => {
        state.cycle = name
    }
    const clearScreen = ()=> {
        state.mode = '',
        state.cycle = ''

    }
    if(!store.screenList.serviceMode) getScreenList()
</script>
<template>
    <van-nav-bar title="筛选" left-arrow @click-left="leftBack">
        <template #left>
            <van-icon name="cross" size="18" />
        </template>
    </van-nav-bar>
    <div class="task-screen">
        <h3>服务方式</h3>
        <div class="screen-item">
            <span :class="state.mode == item?'active':''" v-for="(item,index) in store.screenList.serviceMode" :key="index" @click="modeChange(item)">{{item}}</span>
        </div> 
        <h3>任务周期</h3>
        <div class="screen-item">
            <span  :class="state.cycle == item?'active':''" v-for="(item,index) in store.screenList.taskCycle" :key="index"  @click="cycleChange(item)">{{item}}</span>
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