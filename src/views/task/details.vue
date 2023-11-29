<script setup lang="ts">
    import { reactive } from 'vue';
    import {useRouter} from 'vue-router'
    import {  taskDetails,taskCollection } from '@/api/task';
    import TaskDetail from './components/TaskDetail.vue'
    import { showToast } from 'vant';
    
    const router  = useRouter()
    const taskId = router.currentRoute.value.params.id
    const state:any = reactive({
        item: {},
        status: 0,
        loading: false
    })
    const leftBack = () => history.back();
    const gotoMessage = () => {
        router.push('/message/talk/'+state.item.task_id +'/'+state.item.user_id)
    }
    const getTaskDetail = async () => {
        state.loading = true
        const res:any = await taskDetails({
                task_id: taskId
        })
        if(res){
            state.item = res.records[0]
            state.status = res.records[0].status
            state.loading = false
        }else{
            showToast(res.msg)
            state.loading = false
        }
    }
    getTaskDetail()
    const setTaskCollection = async () => {
        state.loading = true
        const res:any = await taskCollection({
                task_id: taskId
        })
        if(res){
            state.status = res.data.status
            state.loading = false
        }
            showToast(res.msg)
            state.loading = false
    }
</script>
<template>
    <van-nav-bar title="任务详情" left-arrow @click-left="leftBack"/>
    <TaskDetail :item="state.item" v-if="state.item"></TaskDetail>
    <div class="task-detail-footer">
        <van-action-bar-icon :class="state.status==1?'active':''" icon="star-o" text="收藏" @click="setTaskCollection" />
        <van-button type="primary" block @click="gotoMessage">立即沟通</van-button>
    </div>
</template>
<style scoped>
    .task-detail-footer{
    display: flex;
    position: fixed;
    left: 0;
    width: 100%;
    align-items: center;
    background: #ffffff;
    bottom: 0;
    padding: 0.64rem 0;
}
.task-detail-footer button{
    margin-right: 0.64rem;
}
.task-detail-footer .active :deep() .van-icon-star-o:before{
    color: #FE8F27;
}
</style>