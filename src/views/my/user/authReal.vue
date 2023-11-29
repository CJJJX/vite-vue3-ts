<script setup lang="ts">
    import {reactive} from 'vue'
    import UploadImage from '../components/UploadImage.vue'
    import {addAuthReal} from '@/api/my'
    import {showToast} from 'vant'
    const leftBack = () => history.back()
    const state = reactive({
        name: '',
        number: '',
        idCardJust: '',
        idCardBack: ''
    })


    const submit = async() => {
        if(!state.name){
        showToast('请输入真实姓名')
        return
    }
    if(!state.number){
        showToast('请输入证件号码')
        return
    }
    if(!state.idCardJust){
        showToast('请上传身份证正面')
        return
    }
    if(!state.idCardBack){
        showToast('请上传身份证反面')
        return
    }
        const res = await addAuthReal({
            "user_name": state.name, 
            "cert_no": state.number, 
            "idCard_just": state.idCardJust, 
            "idCard_back": state.idCardBack
        })
        if(res){
            leftBack()
            showToast('保存成功')
        }else{
            showToast('保存失败')
        }
    }
    const uploadJust = (value:any) => {
        state.idCardJust = value
    }
    const uploadBack = (value:any) => {
        state.idCardBack = value
    }
</script>
<template>
    <van-nav-bar title="实名认证" left-arrow @click-left="leftBack"/>
    <h3>请如实填写信息，平台承诺保障客户的信息安全</h3>
    <van-field v-model="state.name" label="姓名" placeholder="请输入真实姓名" />
    <van-field v-model="state.number" label="证件号码" placeholder="请输入证件号码" />
    <div class="auth-pic">
        <UploadImage text="上传身份证正面照" @uploadChange="uploadJust"></UploadImage>
        <UploadImage text="上传身份证反面照" @uploadChange="uploadBack"></UploadImage>
    </div>
    <button class="wy-submit" @click="submit">提交实名认证</button>
</template>
<style scoped>
h3{
    width: 100%;
    height: 2.14rem;
    line-height: 2.14rem;
    background: #FFF2E3;
    font-size: 0.75rem;
    text-align: center;
    font-weight: 100;
    color: #FF9415;
  }
  .auth-pic{
    display: flex;
    justify-content: space-around;
    margin-top: 1.09rem;
  }
</style>