<script setup lang="ts">
  import {reactive} from 'vue'
  import {companyDetail} from '@/api/my'

  const state:any = reactive({
    detail: {}
  })
  const getCompanyDetail = async () => {
    const res = await companyDetail()
    if(res){
        state.detail = res.data
    }
  }
  const gotoBack = () => history.back()
  getCompanyDetail()
</script>
<template>
    <van-icon class="back" name="arrow-left" @click="gotoBack" />
    <img class="cert-pic" src="@/assets/img/my/company-certified.png" />
    <h5>已完成企业认证</h5>
    <van-field :model-value="state.detail.company_name" label="企业名称" readonly/>
    <van-field :model-value="state.detail.organization_code" label="机构代码" readonly/>
    <van-field :model-value="state.detail.contacts" label="企业法人" readonly />
    <van-field :model-value="state.detail.phone" label="联系电话" readonly />
    <van-field label="企业营业执照" class="border-none" readonly />
    <img class="cert-img" :src="state.detail.permit" />
    <div class="cert-bottom">
        <img src="@/assets/img/my/auth-real-safe.png" />
        <p>信息安全保护中，未经您授权不对外提供</p>
    </div>
</template>
<style scoped>
  :deep(.van-field__control) {
    text-align: right;
  }
  h5{
    font-size: 0.94rem;
    font-weight: 400;
    color: #FFFFFF;
    position: absolute;
    width: 100%;
    text-align: center;
    top: 13.5rem;
  }
  .back{
    position: absolute;
    top: 1rem;
    left: 0.69rem;
    font-size: 1rem;
    color: #ffffff;
  }
  .cert-pic{
    width: 100%;
  }
  .cert-bottom{
    text-align: center;
    width: 100%;
    margin-bottom:1rem;
  }
  .cert-bottom img{
    width: 0.93rem;
    height: 1.07rem;
    margin-bottom: 0.72rem;
  }
  .cert-bottom p{
    font-size: 0.61rem;
    line-height: 0.61rem;
    font-weight: 400;
    color: #999999;
    text-align: center;
  }
  .cert-img{
    width: 7.57rem;
    height: 5.17rem;
    display: block;
    margin: 2.45rem auto 1rem;
  }
  .border-none{
    border: none;
  }
</style>