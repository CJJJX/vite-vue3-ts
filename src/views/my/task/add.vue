<script setup lang="ts">
    import { reactive,provide } from 'vue';
    import { screenList,addTask } from '@/api/task';
    import { showToast } from 'vant';
    import PositionType from '@/views/task/components/PositionType.vue'
    import TaskDemand from './components/taskDemand.vue'

    const state:any = reactive({
        positionTypeBool: false,
        taskDemandBool: false,
        taskCycleBool: false,
        serviceModeBool: false,
        taskCycleList: [],
        serviceModeList: [],
        showCity: false,
        loading: false,
        taskName: '',
        positionName: '',
        taskBudget: '',
        taskCycle: '',
        serviceMode: '',
        taskDemand: '',
        taskType: false
    })
    const leftBack = () => history.back();
    const setTaskModify = async () => {
        if(!state.taskName){
            showToast('请填写任务名称')
            return
        }
        if(!state.positionName){
            showToast('请选择职位类型')
            return
        }
        if(!state.taskBudget){
            showToast('请输入任务预算')
            return
        }
        if(!state.taskCycle){
            showToast('请选择任务周期')
            return
        }
        if(!state.serviceMode){
            showToast('请选择服务方式')
            return
        }
        if(!state.taskDemand){
            showToast('请选择任务要求')
            return
        }
        state.loading = true
        const res:any = await addTask({
            "task_name": state.taskName, 
            "position_name": state.positionName,
            "task_budget":  state.taskBudget,
            "task_cycle": parseFloat(state.taskCycle),
            "service_mode": state.serviceMode,
            "task_ask": state.taskDemand,
            "is_emergency": state.taskType?1:0
        })
        if(res){
            showToast('添加成功')
            leftBack()
        }else{
            showToast('添加失败')
        }
        showToast(res.msg)
        state.loading = false
    }
    const getScreenList = async () => {
        let res = await screenList()
        let cycle = []
        let type = []
        for(var i =0;i<res.data.taskCycle.length;i++){
            cycle.push({
                name: res.data.taskCycle[i]
            })
        }
        for(var j =0;j<res.data.serviceMode.length;j++){
            type.push({
                name: res.data.serviceMode[j]
            })
        }
        state.taskCycleList = cycle
        state.serviceModeList = type
    }
    const taskCycleSelect = (value:any) => {
        state.taskCycle = value.name
        state.taskCycleBool = false
    }
    const closePositionType = (name:any) => {
        state.positionName = name
        state.positionTypeBool = false
    }
    const serviceModeSelect = (value:any) => {
        state.serviceMode = value.name
        state.serviceModeBool = false
    }
    const closeDemand = (value:any) => {
        if(value){
            state.taskDemand = value
        }
        state.taskDemandBool = false
    }
    getScreenList()
    provide('popup',{
        closePositionType,
        closeDemand
    })
</script>
<template>
    <van-nav-bar title="新建任务" left-arrow @click-left="leftBack"/>
    <div class="user-page">
        <van-form @submit="setTaskModify">
            <div class="user-item">
                <h5>任务名称</h5>
                <van-field v-model="state.taskName" label="" placeholder="请输入任务名称" />
            </div>
            <div class="user-item">
                <h5>职位类型</h5>
                <van-field v-model="state.positionName" label="" placeholder="请选择职位类型" 
                    readonly
                    is-link
                    @click="state.positionTypeBool = true"/>
            </div>
            <div class="user-item">
                <h5>任务预算</h5>
                <van-field class="budget" v-model="state.taskBudget" label="" type="number" placeholder="请输入任务预算" />
            </div>
            <div class="user-item">
                <h5>任务周期</h5>
                <van-field v-model="state.taskCycle" label="" placeholder="请选择任务周期"
                    readonly
                    right-icon="arrow"
                    @click="state.taskCycleBool = true"/>
                <van-action-sheet 
                    v-model:show="state.taskCycleBool"
                    :actions="state.taskCycleList"
                    cancel-text="取消"
                    @select="taskCycleSelect"
                ></van-action-sheet>
            </div>
            <div class="user-item">
                <h5>服务方式</h5>
                <van-field v-model="state.serviceMode" label="" placeholder="请选择服务方式"
                    readonly
                    right-icon="arrow"
                    @click="state.serviceModeBool = true"/>
                <van-action-sheet 
                    v-model:show="state.serviceModeBool"
                    :actions="state.serviceModeList"
                    cancel-text="取消"
                    @select="serviceModeSelect"
                ></van-action-sheet>
            </div>
            <div class="user-item">
                <h5>任务要求</h5>
                <van-field v-model="state.taskDemand" label="" placeholder="请填写任务要求"
                    readonly
                    right-icon="arrow"
                    @click="state.taskDemandBool = true"/>
            </div>
            <div class="user-item">
                <h5>任务类型</h5>
                <div class="task-switch">
                    <van-field :disabled="true" label="" placeholder="是否紧急"
                        readonly
                        @click="state.showCity = true"/>
                    <van-switch v-model="state.taskType" />
                </div>
            </div>
            <button class="wy-confirm-btn" native-type="submit">完成</button>
        </van-form>
        <!--职位类型弹窗-->
        <van-popup v-model:show="state.positionTypeBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
            <PositionType></PositionType>
        </van-popup>
        <!--任务要求-->
        <van-popup v-model:show="state.taskDemandBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
            <TaskDemand></TaskDemand>
        </van-popup>
    </div>
</template>
<style scoped>
:deep(.van-image__img){
    border-radius: 50%;
}
:deep(.van-uploader__upload){
    margin: 0;
}

.user-page{
    margin: 1.47rem 0.6rem;
    padding-bottom: 1rem;
}
.task-switch{
    position: relative;
}
:deep(.van-switch){
    position: absolute;
    top: 0.4rem;
    right: 0.6rem;
    transform: scale(0.8);
}
:deep(.van-switch--on){
    background: linear-gradient(90deg, #FEA829, #FE8F27);
}
.budget{
    position: relative;
}
.budget::before{
    position: absolute;
    right: 0.9rem;
    content: '元';
    font-size: 0.8rem;
    font-weight: 300;
    color: #333333;
}
.wy-confirm-btn{
    height: 2.35rem;
    line-height: 2.35rem;
    background: linear-gradient(90deg, #FEA829, #FE8F27);
    border-radius: 0.27rem;
    width: calc(100vw - 1.2rem);
    border: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    margin: 0 0.6rem 0.6rem;
    font-size: 0.8rem;
    color: #FFFFFF;
}
</style>