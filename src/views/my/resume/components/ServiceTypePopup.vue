<script setup lang="ts">
    import {inject,reactive} from 'vue'
    import {myStore} from '@/store/my'
    const state = reactive({
        value:[]
    })
    const store = myStore()
    const {closeServiceTypePopup} = inject('popup') as any
</script>
<template>
    <van-nav-bar title="服务类型" left-arrow @click-left="closeServiceTypePopup('')"/>
    <van-checkbox-group v-model="state.value">
        <van-checkbox :name="item" shape="square" v-for="(item,index) in store.jobsType" :key="index">{{item}}</van-checkbox>
    </van-checkbox-group>
    <button class="wy-submit" @click="closeServiceTypePopup(state.value)">完成</button>
</template>
<style scoped>
.van-checkbox-group{
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
  }
</style>
