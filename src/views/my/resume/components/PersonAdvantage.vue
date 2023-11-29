<script setup lang="ts">
    import {reactive,provide} from 'vue'
    import {myStore} from '@/store/my'
    import PersonAdvantagePopup from './PersonAdvantagePopup.vue'
    const state = reactive({
        show: false
    })
    const store:any = myStore()
    const props = defineProps({
        page:{
            type: String
        }
    })
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
            <h3>个人优势<img src="@/assets/img/my/icon-feedback.png" @click="state.show=true" v-if="props.page!=='preview'"/></h3>
            <label>{{store.resumeInfo.advantage||'请填写个人优势'}}</label>
    </div>
    <!-- 个人优势填写弹出层 -->
        <van-popup v-model:show="state.show" duration="0" position="top" :style="{ width: '100%',height: '100%' }">
          <PersonAdvantagePopup></PersonAdvantagePopup>
        </van-popup>
</template>
<style scoped>
.resume-label h3{
    display: flex;
    align-items: flex-end;
}
.resume-label img{
    width: 1rem;
    height: 1rem;
    margin-left: 0.32rem;
}
</style>