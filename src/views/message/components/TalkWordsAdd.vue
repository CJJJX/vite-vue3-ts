<script setup lang="ts">
import {reactive,inject,watchEffect} from 'vue'
import {chatMessageWordsAdd,chatMessageWordsEdit} from '@/api/message'
import {showToast} from 'vant'

    const props = defineProps({
        title:{
            type: String
        },
        id:{
            type: Number
        },
        text:{
            type: String
        }
    })
    const {closeWorksAdd} = inject('popup') as any//解构出父组件提供的方法
    const state:any = reactive({
        loading: false,
        list: [],
        value:  ''
    })
    watchEffect(()=>{
        state.value = props.text
    })
    const submitAdd = async () => {
        if(!state.value){
            showToast('请输入常用语')
            return
        }
        state.loading = true
        let res:any = null
        if(props.id){ //修改
            res = await chatMessageWordsEdit({
                id: props.id,
                text: state.value
            })
        }else{ //添加
            res = await chatMessageWordsAdd({
            text: state.value
            })
        }
        if(res){
            state.value=''
            closeWorksAdd()
        }else{
            showToast(res.msg)
        }
        state.loading = false 
    }
</script>
<template>
    <van-nav-bar :title="props.title" left-arrow @click-left="closeWorksAdd">
        <template #right>
            <span @click="submitAdd">完成</span>
        </template>
    </van-nav-bar>
    <van-field
    v-model="state.value"
    rows="10"
    autosize
    type="textarea"
    maxlength="200"
    show-word-limit
    placeholder="请输入您的常用回复请不要填写qq、微信等联系方式或 广告信息，否则系统将封禁您的账号。"/>
</template>
<style scoped>
:deep(.van-field__word-num) {
    color: #FF9415;
}
:deep(.van-field__word-limit) {
    color: #999999;
}
</style>

