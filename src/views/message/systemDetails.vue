<script setup lang="ts">
    import { reactive } from 'vue'
    import {useRouter} from 'vue-router'
    import {  systemDetail } from '@/api/message'
    import { showToast } from 'vant'

    
    const router  = useRouter()
    const id = router.currentRoute.value.params.id
    const state:any = reactive({
        item: {},
        loading: false
    })
    const leftBack = () => history.back();

    const getSystemDetail = async () => {
        state.loading = true
        const res:any = await systemDetail({
                id
        })
        if(res){
            state.item = res[0]
        }else{
            showToast(res.msg)   
        }
        state.loading = false
    }
    getSystemDetail()
</script>
<template>
    <van-nav-bar title="查看消息" left-arrow @click-left="leftBack"/>
    <h3>{{state.item.title}}</h3>
    <p>{{state.item.content}}</p>
</template>
<style scoped>
 h3{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 400;
    color: #333333;
    margin: 1.7rem 0.75rem 0.83rem;
}
p{
    font-size: 0.69rem;
    font-weight: 500;
    color: #666666;
    line-height: 1.23rem;
    text-indent: 2em;
}
</style>