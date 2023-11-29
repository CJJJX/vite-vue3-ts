<script setup lang="ts">
    import UserInfoPage from '../components/UserInfoPage.vue'
    import {provide} from 'vue'
    const closeChange = ()=> {
        history.back()
    }
    provide('popup',{
        closeChange
    })
</script>
<template>
    <UserInfoPage></UserInfoPage>
</template>
<style scoped>

</style>