<script setup lang="ts">
    import { useRoute,useRouter } from 'vue-router'
    import {userStore} from '@/store/user'
    const store:any = userStore()
    const router = useRouter()
    const route = useRoute()
    const gotoPage = (path:any) => router.push(path)
    // role：1人才 2管理 3企业 
</script>
<template>
    <dl>
        <dt v-if="store.role == 1" class="icon-task-bar" :class="route.path === '/task' ? 'active' : ''" @click="gotoPage('./task')">
            <i></i>
            <p>任务</p>
        </dt>
        <dt v-if="store.role == 2" class="icon-task-bar" :class="route.path === '/admin/home' ? 'active' : ''" @click="gotoPage('./admin/home')">
            <i></i>
            <p>首页</p>
        </dt>
        <dt v-if="store.role == 3" class="icon-talent-bar" :class="route.path === '/talent' ? 'active' : ''" @click="gotoPage('./talent')">
            <i></i>
            <p>IT人才</p>
        </dt>
        <dt v-if="store.role !== 2"  class="icon-contract-bar" :class="route.path === '/contract' ? 'active' : ''"  @click="gotoPage('./contract')">
            <i></i>
            <p>合约</p>
        </dt>
        <dt v-if="store.role !== 2" class="icon-message-bar" :class="route.path === '/message' ? 'active' : ''"  @click="gotoPage('./message')">
            <i></i>
            <p>消息</p>
        </dt>
        <dt class="icon-my-bar" :class="route.path === '/my' ? 'active' : ''"  @click="gotoPage('/my')">
            <i></i>
            <p>我的</p>
        </dt>
    </dl>
</template>
<style scoped>
dl{
    display: flex;
    width: 100%;
    height: 3rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    border-top: 1px solid #ddd;
    background: #fff;
}
dl dt{
    flex: 1;
    padding: 0.69rem 0;
    justify-content: center;
    text-align: center;
    font-size: 0.59rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: #666;
}
dl dt i{
    width: 0.91rem;
    height: 0.91rem;
    display: block;
    margin: 0 auto;
}
.icon-task-bar i{
    background: url('@/assets/img/icon/bar-task-link.png') no-repeat;
    background-size: 100%;
}
.icon-task-bar.active i{
    background: url('@/assets/img/icon/bar-task-active.png') no-repeat;
    background-size: 100%;
}
.icon-talent-bar i{
    background: url('@/assets/img/icon/bar-talent-link.png') no-repeat;
    background-size: 100%;
}
.icon-talent-bar.active i{
    background: url('@/assets/img/icon/bar-talent-active.png') no-repeat;
    background-size: 100%;
}
.icon-contract-bar i{
    background: url('@/assets/img/icon/bar-contract-link.png') no-repeat;
    background-size: 100%;
}
.icon-contract-bar.active i{
    background: url('@/assets/img/icon/bar-contract-active.png') no-repeat;
    background-size: 100%;
}
.icon-message-bar i{
    background: url('@/assets/img/icon/bar-message-link.png') no-repeat;
    background-size: 100%;
}
.icon-message-bar.active i{
    background: url('@/assets/img/icon/bar-message-active.png') no-repeat;
    background-size: 100%;
}
.icon-my-bar i{
    background: url('@/assets/img/icon/bar-my-link.png') no-repeat;
    background-size: 100%;
}
.icon-my-bar.active i{
    background: url('@/assets/img/icon/bar-my-active.png') no-repeat;
    background-size: 100%;
}
dl dt.active p{
    color: #ff9415;
}
</style>