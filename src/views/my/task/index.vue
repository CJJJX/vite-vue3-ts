<script setup lang="ts">
    import {reactive} from 'vue'
    import {useRouter} from 'vue-router'
    import {myTaskAllList} from '@/api/task'
    const router = useRouter()
    const tabs = [
        {type: 0,text:'审核中'},
        {type: 1,text:'已开启'},
        {type: 2,text:'已下架'},
        {type: 3,text:'已关闭'}
    ]
    const state:any = reactive({
        loading: false,
        list: [],
        cur: 0
    })
    const leftBack = () => history.back()
    const gotoDetail = (id:Number) => {
        router.push('/my/task/details/'+id)
    }
    const getTabList = async(type:any) => {
        state.cur = type
        const res:any = await myTaskAllList({type:type})
        state.loading = true
        if(res){
            state.list = res.records
        }
        state.loading = false
    }
    getTabList(0)
</script>

<template>
    <van-nav-bar title="任务管理" left-arrow @click-left="leftBack"/>
    <div class="task-contract-tab">
        <span v-for="(item,index) in tabs" :key="index" :class="state.cur==item.type?'active':''" @click="getTabList(item.type)">{{item.text}}<i></i></span>
    </div>     
    <div class="task-contract-list">
            <div class="wy-no-data" v-if="!state.loading && state.list.length==0">暂无数据</div>
            <van-loading v-if="state.loading">加载中...</van-loading>
            <div class="task-contract-item" v-for="(item,index) in state.list" :key="index" @click="gotoDetail(item.task_id)">
                <h2>
                    <label>{{item.task_name}}</label>
                    <span>{{item.is_check_text}}</span>
                </h2>
            <p>{{item.task_budget}} ｜ {{item.task_cycle}}天 ｜ {{item.service_mode}}</p>
            </div>
    </div> 
    <router-link to="/my/task/add"><button class="wy-submit" >新建任务</button></router-link>
</template>
<style scoped>
 .task-contract-tab{
        display: flex;
    }
    .task-contract-tab span{
        flex: 1;
        font-size: 0.75rem;
        font-weight: 400;
        color: #666666;
        line-height: 0.75rem;
        text-align: center;
        padding: 0.59rem 0;
        border-bottom: 1px solid  #EEEEEE;
        position: relative;
    }
    .task-contract-tab span i{
        width: 1.63rem;
        height: 0.05rem;
        background: #ffffff;
        position: absolute;
        bottom: 0px;
        left: 50%;
        margin-left: -0.815rem;
    }
    .task-contract-tab span.active i{
        background: #FF9415;
    }
    .task-contract-list{
        width: 100%;
        height: calc(100vh - 7.5rem);
    }
    .task-contract-item{
        padding: 1.63rem 0.59rem 1.43rem;
        border-bottom: 1px solid #eeeeee;
    }
    h2{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 0.48rem;
    }
    h2 label{
        font-size: 0.85rem;
        line-height: 0.85rem;
        font-weight: 400;
        color: #333333;
    }
    h2 span{
        font-size: 0.75rem;
        line-height: 0.75rem;
        font-weight: 400;
        color: #FF9415;
    }
</style>