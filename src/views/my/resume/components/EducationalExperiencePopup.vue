<script setup lang="ts">
    import {reactive,inject} from 'vue'
    import {editEdu} from '@/api/my'
    import {myStore} from '@/store/my'
    import {showToast} from 'vant'

    const {closeChange} = inject('popup') as any
    const columnsType:any = ['year', 'month']
    const state:any = reactive({

        showStartTime: false,
        showEndTime: false,
        showEducation: false,
        schoolName: '',
        education: '',
        major: '',
        startTime: '',
        endTime: '',
        minDate: new Date(2000,1,1),
        maxDate: new Date()
    })
    const store:any = myStore()
    store.getResumeDict()
    
    if(Object.keys(store.resumeInfo).length!==0){
        state.schoolName = store.resumeInfo.school_name
        state.education = store.resumeInfo.highest_education
        state.major = store.resumeInfo.major
        state.startTime = store.resumeInfo.teach_start_time
        state.endTime = store.resumeInfo.teach_end_time
    }

    const startTimeConfirm = (value:any) => {
        state.startTime = value.selectedValues[0] + '-' + value.selectedValues[1]
        state.showStartTime = false
    }
    const endTimeConfirm = (value:any) => {
        state.endTime = value.selectedValues[0] + '-' + value.selectedValues[1]
        state.showEndTime = false
    }
    const educationSelect = (value:any) => {
        state.education = value.name
    }
    const submit = async() => {
        if(!state.schoolName){
            showToast('请输入学校名称')
            return
        }
        if(!state.projectDesc){
            showToast('请选择学历')
            return
        }
        if(!state.major){
            showToast('请输入专业')
            return
        }
        if(!state.startTime && !state.endTime){
            showToast('请选择完成教育时间')
            return
        }
        const res = await editEdu({
            "uuid": store.resumeInfo.id, 
            "highest_education": state.education, 
            "school_name": state.schoolName, 
            "major": state.major, 
            "teach_start_time":  state.startTime, 
            "teach_end_time":   state.endTime
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
    <van-nav-bar title="教育经历" left-arrow @click-left="closeChange"/>
    <div class="position-list">
        <div class="user-item">
            <h5>学校名称</h5>
            <van-field v-model="state.schoolName" placeholder="请填写您的学校名称"/>
        </div>
        <div class="user-item">
            <h5>学历</h5>
            <van-field v-model="state.education" placeholder="请填写您的学历" readonly is-link/>
            <van-action-sheet v-model:show="state.showEducation" :actions="store.highestEducation" 
                cancel-text="取消"  close-on-click-action @select="educationSelect"
                @cancel="state.showEducation = false"/>
        </div>
        <div class="user-item">
            <h5>专业</h5>
            <van-field v-model="state.major" placeholder="请填写您的专业"
            type="textarea" rows="10" autosize/>
        </div>
        <div class="user-item">
            <h5>就读时间</h5>
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