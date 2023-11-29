<script setup lang="ts">
    import {reactive,inject} from 'vue'
    import {personAdvantage} from '@/api/my'
    import {myStore} from '@/store/my'
    import {showToast} from 'vant'
    const {closeChange} = inject('popup') as any
    const state = reactive({
        value:''
    })
    const store:any = myStore()
    state.value = store.resumeInfo.advantage
    const submit = async() => {
        if(!state.value){
            showToast('请输入个人优势')
            return
        }
        const res = await personAdvantage({advantage:state.value})
        if(res){
            showToast('保存成功')
            closeChange()
        }else{
            showToast('保存失败')
        }
    }
</script>
<template>
    <van-nav-bar title="个人优势" left-arrow @click-left="closeChange"/>
    <van-field
        v-model="state.value"
        rows="12"
        autosize
        type="textarea"
        maxlength="500"
        show-word-limit
    placeholder="请输入您的个人优势"/>
    <button class="wy-submit" @click="submit">保存</button>
</template>
<style scoped>

</style>