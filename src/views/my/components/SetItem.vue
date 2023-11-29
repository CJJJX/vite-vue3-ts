<script setup lang="ts">
    import {useRouter} from 'vue-router'
    
    const router = useRouter()
    const gotoPage = (path:any) => {
        router.push(path)
    }
</script>
<template>
    <div class="my-common">
            <div class="my-item" @click="gotoPage('/login/privacyPolicy')">
                <img src="@/assets/img/my/icon-privacy.png"/><label>隐私政策</label>
                <span><van-icon name="arrow" /></span>
            </div>
            <div class="my-item" @click="gotoPage('/login/serviceAgree')">
                <img src="@/assets/img/my/icon-agreement.png"/><label>服务协议</label>
                <span><van-icon name="arrow" /></span>
            </div>
        </div>  
</template>
<style scoped>
.my-common{
    background: #FFFFFF;
    border-radius: 0.27rem;
    margin: 0.8rem 0.64rem 1rem;
  }
  .my-item{
    height: 2.67rem;
    background: #FFFFFF;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 0 0.4rem 0 0rem;
    margin-left: 0.69rem;
    font-size: 0.69rem;
    color: #464646;
  }
  .my-item:last-child{
    border-bottom: 0;
  }
  .my-item img{
    width: 1.12rem;
    height: 1.12rem;
    margin-right: 0.85rem;
  }
  .my-item label{
    flex: 1;
  }
  .my-item span{
    display: flex;
    align-items: center;
    text-align: right;
  }
  .my-item span img{
    width: 1.28rem;
    height: 1.28rem;
    border-radius: 50%;
    margin-right: 0.32rem;
  }
</style>