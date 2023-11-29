<script setup lang="ts">
    import {reactive,provide} from 'vue'
    import {myStore} from '@/store/my'
    import {workDelete} from '@/api/my'
    import WorkExperiencePopup from './WorkExperiencePopup.vue'
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
    const addWork = ()=> {
       state.item = {
        uuid: store.resumeInfo.id
       }
       state.show = true
    }
    const editWork = (item:any)=> {
        state.item =item
        state.show = true
        }
    const closeChange = ()=> {
        state.show = false
        store.getResumeDetail()
    }
    const submitDelete = async(id:Number)=> {
        const res = await workDelete({id:id})
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
            <h3>工作经历<van-icon name="add-o" @click="addWork" v-if="props.page!=='preview'"/></h3>
            <van-swipe-cell v-if="store.companyList.length" v-for="(item,index) in store.companyList" :key="index">
                <h4>{{item.company_name}}<van-icon v-if="props.page!=='preview'"  @click="editWork(item)" name="arrow" /></h4>
                <h5>{{item.work_position}}</h5>
                <p>{{item.start_time}} - {{item.end_time}}</p>
                <h5>工作描述</h5>
                <van-field v-model="item.company_describe" autosize type="textarea" readonly />
                <template #right>
                    <img v-if="props.page!=='preview'"  @click="submitDelete(item.id)"
                     src="@/assets/img/icon/icon-delete.png" class="delete" />
                </template>
            </van-swipe-cell>
            <label v-else>请您填写您的工作经历</label>
    </div>
    <!-- 工作经历填写弹出层 -->
        <van-popup v-model:show="state.show" duration="0" position="top" :style="{ width: '100%',height: '100%' }">
          <WorkExperiencePopup :item="state.item"></WorkExperiencePopup>
        </van-popup>
</template>
<style scoped>

</style>