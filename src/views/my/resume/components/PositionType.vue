<script setup lang="ts">
    import {reactive,provide} from 'vue'
    import {myStore} from '@/store/my'
    import PositionTypePopup from './PositionTypePopup.vue'
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
        <h3>求职意向<van-icon name="add-o" @click="state.show=true" v-if="props.page!=='preview'"/></h3>
        <label v-if="store.resumeInfo.position_name || store.resumeInfo.service_mode || store.resumeInfo.service_price">
            {{store.resumeInfo.position_name}} || {{store.resumeInfo.service_mode}} || {{store.resumeInfo.service_price}}
        </label>
        <label v-else>请添加您的求职意向</label>
    </div>
    <!-- 个人优势填写弹出层 -->
        <van-popup v-model:show="state.show" duration="0" position="top" :style="{ width: '100%',height: '100%' }">
          <PositionTypePopup></PositionTypePopup>
        </van-popup>
</template>
<style scoped>

</style>