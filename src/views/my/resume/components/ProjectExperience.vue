<script setup lang="ts">
    import {reactive,provide} from 'vue'
    import {myStore} from '@/store/my'
    import {projectDelete} from '@/api/my'
    import ProjectExperiencePopup from './ProjectExperiencePopup.vue'
    import {showToast} from 'vant'
    const state = reactive({
        show: false,
        item: {}
    })
    const store:any = myStore()
    const props = defineProps({
        page:{
            type: String
        }
    })
    const addProject = ()=> {
       state.item = {
        id: store.resumeInfo.id
       }
       state.show = true
    }
    const editProject = (item:any)=> {
        state.item =item
        state.show = true
        }
    const closeChange = ()=> {
        state.show = false
        store.getResumeDetail()
    }
    const submitDelete = async(id:Number)=> {
        const res = await projectDelete({id:id})
        if(res){
            showToast('删除成功')
            store.getResumeDetail()
        }else{
            showToast('删除失败')
        }
    }
    provide('popup',{
        closeChange
    })
</script>
<template>
    <div class="resume-label">
            <h3>项目经历<van-icon name="add-o" @click="addProject" v-if="props.page!=='preview'"/></h3>
            <van-swipe-cell v-if="store.projectList.length" v-for="(item,index) in store.projectList" :key="index">
                <h4>{{item.project_name}}<van-icon v-if="props.page!=='preview'"  @click="editProject(item)" name="arrow" /></h4>
                <p>{{item.project_start_time}} - {{item.project_end_time}}</p>
                <h5>项目职责</h5>
                <van-field v-model="item.project_duty" autosize type="textarea" readonly />
                <template #right>
                    <img v-if="props.page!=='preview'"  @click="submitDelete(item.id)"
                     src="@/assets/img/icon/icon-delete.png" class="delete" />
                </template>
            </van-swipe-cell>
            <label v-else>请您填写您的项目经历</label>
    </div>
    <!-- 工作经历填写弹出层 -->
        <van-popup v-model:show="state.show" duration="0" position="top" :style="{ width: '100%',height: '100%' }">
          <ProjectExperiencePopup :item="state.item"></ProjectExperiencePopup>
        </van-popup>
</template>
<style scoped>

</style>