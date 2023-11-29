<script setup lang="ts">
    import {reactive,provide} from 'vue'
    import {myStore} from '@/store/my'
    import EducationalExperiencePopup from './EducationalExperiencePopup.vue'

    const state:any = reactive({
        show: false,
        item: {}
    })
    const store:any = myStore()
    const props = defineProps({
        page:{
            type: String
        }
    })
    const edit = ()=> {
        state.show = true
        }
    const closeChange = ()=> {
        state.show = false
        store.getResumeDetail()
    }
    provide('popup',{
        closeChange
    })
</script>
<template>
    <div class="resume-label">
            <h3>教育经历<van-icon name="add-o" @click="edit" v-if="props.page!=='preview'"/></h3>
            <div v-if="store.resumeInfo.school_name">
                <h4>{{store.resumeInfo.school_name}}<van-icon v-if="props.page!=='preview'"  @click="edit" name="arrow" /></h4>
                <p>{{store.resumeInfo.teach_start_time}} - {{store.resumeInfo.teach_end_time}}</p>
                <h5>{{store.resumeInfo.major}} | {{store.resumeInfo.highest_education}}</h5>
            </div>
            <label v-else>请您填写您的教育经历</label>
    </div>
    <!-- 工作经历填写弹出层 -->
        <van-popup v-model:show="state.show" duration="0" position="top" :style="{ width: '100%',height: '100%' }">
          <EducationalExperiencePopup></EducationalExperiencePopup>
        </van-popup>
</template>
<style scoped>
.text-list dt{
    font-size: 0.59rem;
    line-height: 0.59rem;
    font-weight: 300;
    color: #666666;
    padding: 0.4rem 0.5rem;
    margin-right: 0.27rem;
    margin-bottom: 0.3rem;
    background: #F6F7F8;
    border-radius: 0.16rem;
    display: inline-block;
}
</style>