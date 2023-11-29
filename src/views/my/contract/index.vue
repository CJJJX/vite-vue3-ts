<script setup lang="ts">
    import {useRouter} from 'vue-router'
    import ContractPage from '../../contract/components/ContractPage.vue'
    const router = useRouter()
    const type:any = router.currentRoute.value.params.id
    const leftBack = () => history.back()
</script>
<template>
    <van-nav-bar title="合约" left-arrow @click-left="leftBack"/>
    <Suspense>
        <ContractPage :type="type"></ContractPage>
    </Suspense>
</template>
<style scoped>
</style>