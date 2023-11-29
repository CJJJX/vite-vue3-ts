<script setup lang="ts">
    import slotExplain from '../components/slotExplain.vue'
    const leftBack = () => history.back()
</script>
<template>
  <van-nav-bar title="详情说明" left-arrow @click-left="leftBack"/>
  <slotExplain>
    <h5>1、什么是无忧币？</h5>
    <p>无忧币为驻场无忧推出，可提现，可增值，享受驻场无忧发展 带来的效益。1无忧币≥1元人民币。</p> 
    <h5>2、无忧币怎么提现？</h5>
    <p>在个人账户中，无忧币等同于人民币随时提现，也可以存放在 IT企业服务的平台上享受无忧币的增值空间。</p>
    <h5>3、无忧币怎么增值怎么回购？ </h5>
    <p>无忧币存放在IT企业服务平台一年季度以上，驻场无忧将以无 忧币≥人民币增值回购。</p>
  </slotExplain>
</template>
<style scoped>
  h5{
    font-size: 0.69rem;
    font-weight: 500;
    color: #666666;
    line-height: 1.23rem;
  }
  p{
    margin-bottom: 2rem;
  }
</style>