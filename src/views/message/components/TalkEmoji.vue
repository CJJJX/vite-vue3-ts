<script setup lang="ts">
import {inject} from 'vue'

    const list = ['😀','😁','😂','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗','😙','😚','😇','😐','😑','😶','😏']

    const {emojiChange} = inject('popup') as any //解构出父组件提供的方法
</script>
<template>
    <div>
        <span @click="emojiChange(item)" v-for="(item,index) in list" :key="index">{{item}}</span>
    </div>
</template>
<style scoped>
div{
    height: 8rem;
    margin-top: 0.64rem;
}
div span{
    width: 14.28%;
    display: inline-block;
    text-align: center;
    margin-bottom: 0.32rem;
    font-size: 1.4rem;
}
</style>

