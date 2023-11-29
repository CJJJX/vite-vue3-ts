<script setup lang="ts">
    import {reactive,watch,inject} from 'vue'
    import {editProjectExper} from '@/api/my'
    import {showToast} from 'vant'
    const props = defineProps({
        item:{
            type:Object as any
        }
    })
    const {closeChange} = inject('popup') as any
    const columnsType:any = ['year', 'month']
    const state:any = reactive({

        showStartTime: false,
        showEndTime: false,
        companyName: '',
        startTime: '',
        endTime: '',
        projectDesc: '',
        minDate: new Date(2000,1,1),
        maxDate: new Date()
    })
    const setInfo = () => {

        state.projectName = props.item.project_name
        state.projectDesc = props.item.project_duty
        state.startTime = props.item.project_start_time
        state.endTime = props.item.project_end_time
    }
    watch(()=>props.item,(newValue,oldValue) => {
        console.log(oldValue,newValue)
        setInfo()
    })
    setInfo()
    const startTimeConfirm = (value:any) => {
        state.startTime = value.selectedValues[0] + '-' + value.selectedValues[1]
        state.showStartTime = false
    }
    const endTimeConfirm = (value:any) => {
        state.endTime = value.selectedValues[0] + '-' + value.selectedValues[1]
        state.showEndTime = false
    }
    const submit = async() => {
        if(!state.projectName){
            showToast('请输入项目名称')
            return
        }
        if(!state.startTime && !state.endTime){
            showToast('请选择完成项目时间')
            return
        }
        if(!state.projectDesc){
            showToast('请输入项目职责')
            return
        }
        const res = await editProjectExper({
            "project_duty": state.projectDesc, 
            "project_end_time": state.endTime, 
            "project_name": state.projectName, 
            "project_start_time": state.startTime, 
            "id": props.item.id
        })
        if(res){
            showToast('保存成功')
            closeChange()
        }else{
            showToast('保存失败')
        }
    }
 
</script>
<template>
    <van-nav-bar title="项目经历" left-arrow @click-left="closeChange"/>
    <div class="position-list">
        <div class="user-item">
            <h5>项目名称</h5>
            <van-field v-model="state.projectName" placeholder="请填写您的项目名称"/>
        </div>

        <div class="user-item">
            <h5>完成项目时间</h5>
            <div class="work-time-list">
                <van-field v-model="state.startTime" placeholder="请选择开始时间" readonly  @click="state.showStartTime = true"/>
                <span></span>
                <van-field v-model="state.endTime" placeholder="请选择结束时间" readonly  @click="state.showEndTime = true"/>
            </div>

            <van-action-sheet v-model:show="state.showStartTime">
                <van-date-picker
                type="year-month"
                title="选择年月"
                :columns-type="columnsType"
                :min-date="state.minDate"
                :max-date="state.maxDate"
                @confirm="startTimeConfirm"
                @cancel="state.showStartTime=false"/>
            </van-action-sheet>
            <van-action-sheet v-model:show="state.showEndTime">
                <van-date-picker
                type="year-month"
                title="选择年月"
                :columns-type="columnsType"
                :min-date="state.minDate"
                :max-date="state.maxDate"
                @confirm="endTimeConfirm"
                @cancel="state.showEndTime=false"/>
            </van-action-sheet>
        </div>
        <div class="user-item">
            <h5>项目职责</h5>
            <van-field v-model="state.projectDesc" placeholder="请填写您的项目职责"
            type="textarea" rows="10" autosize/>
        </div>
    </div>
    <button class="wy-submit" @click="submit">保存</button>
</template>
<style scoped>
.position-list{
    margin: 1.52rem 0.67rem 0;
  }
  .work-time-list{
    display: flex;
    align-items: center
  }
  .work-time-list span{
    width: 0.83rem;
    height: 0.05rem;
    margin-right: 2.4rem;
    background: #333333;
  }
  .work-time-list .van-cell{
    width: 6rem;
  }
</style>