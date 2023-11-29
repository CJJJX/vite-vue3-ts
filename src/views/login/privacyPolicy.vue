<script setup lang="ts">
    import {  reactive } from 'vue'
    import { getPolicy } from '@/api/user'
    import { showToast } from 'vant';
    const state = reactive({htmlText:''})
    const onClickLeft = () => history.back();
    const getPolicyChange = async ()=>{
        const res:any = await getPolicy({
            id: 16
        })
        if(res){ 
            state.htmlText = res.records[0].content  
        }else{
            showToast(res.msg)
        }
    }
    getPolicyChange()
</script>
<template>
    <van-nav-bar
  title="隐私政策"
  left-arrow
  @click-left="onClickLeft"/>
    <div class="text-content" v-html="state.htmlText"></div>
</template>
<style scoped>
.text-content{
    padding: 0.5rem 0.7rem;    
}
</style>