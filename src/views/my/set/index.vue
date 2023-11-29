<script setup lang="ts">
    import {useRouter} from 'vue-router'
    import SetItem from '../components/SetItem.vue'
    import {userStore} from '@/store/user'

    
    const router  = useRouter()
    const store = userStore()
    const leftBack = () => history.back();
    const logout = () => {
        store.logout()
        router.push('/login')
    }
</script>
<template>
    <div class="set-page">
        <van-nav-bar title="我的设置" left-arrow @click-left="leftBack"/>
        <SetItem></SetItem>
        <button class="wy-confirm-btn" @click="logout">退出登录</button>
    </div>
</template>
<style scoped>
 .set-page{
    height: 100vh;
    background: #f9f9f9;
 }
 .wy-confirm-btn{
    height: 2.35rem;
    line-height: 2.35rem;
    background: linear-gradient(90deg,#fea829,#fe8f27);
    border-radius: 0.27rem;
    width: calc(100vw - 1.2rem);
    border: 0;
    position: fixed;

    margin: 0 0.6rem 0.6rem;
    font-size: 0.8rem;
    color: #fff;
 }
</style>