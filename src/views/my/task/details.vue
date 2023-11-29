<script setup lang="ts">
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import { taskDetails,onOrOff } from '@/api/task';
    import TaskDetail from '@/views/task/components/TaskDetail.vue'
    import { showToast } from 'vant';
    const router = useRouter()
    const taskId = router.currentRoute.value.params.id
    const state:any = reactive({
        item: '',
        loading: false
    })
    const leftBack = () => history.back();
    const getTaskDetail = async () => {
        state.loading = true
        const res:any = await taskDetails({
            task_id: taskId
        })
        if(res){
            state.item = res.records[0]
            state.loading = false
        }else{
            showToast(res.msg)
            state.loading = false
        }
    }
    getTaskDetail()
    const taskOperate = async (type:any) => {
        state.loading = true
        const text = (type==3?"关闭":"启动")
        const res = await onOrOff({
            task_id: taskId,
            is_check: type
        })
        if(res){
            leftBack()
            showToast(text + '成功')
        }else{
            showToast(text + '失败')
        }
        state.loading = false
    }
</script>
<template>
    <van-nav-bar title="任务详情" left-arrow @click-left="leftBack"/>
    <TaskDetail :item="state.item" v-if="state.item"></TaskDetail>
    <div class="task-detail-footer" v-if="state.item.is_check ==1||state.item.is_check ==3">
        <button class="wy-submit" v-if="state.item.is_check ==1" @click="taskOperate(3)">关闭任务</button>
        <button class="wy-submit" v-if="state.item.is_check ==3" @click="taskOperate(1)">开启任务</button>
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