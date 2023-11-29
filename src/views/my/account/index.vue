<script setup lang="ts">
import {reactive} from 'vue'
import AccountInfo from "../components/AccountInfo.vue"
import AccountList from "../components/AccountList.vue"
import {myStore} from '@/store/my'
import {transferList,incomeList} from '@/api/my'

    const leftBack = () => history.back()
    const state:any = reactive({
        check: 0,
        loading: false,
        list: []
    })
    const store:any = myStore()
      const tabs = [
        {type: 0,text:'全部'},
        {type: 1,text:'收入'},
        {type: 2,text:'我的'},
        ]
      //企业端添加支出选项  
      if(store.userInfo.role == 3){
        tabs.splice(2,0,{
            type: 3,
            text: '支出'
        })
      }
    
    const toCheck = async(index:Number,type:Number) => {
        state.check = index
        console.log(type)
        state.list = []
        // index为0全部列表都需要，两个接口都调
        if(type == 0){
            await getTransferList()
            await getIncomeList({type:1})
            if(store.userInfo.role == 3){
                await getIncomeList({type:2})
            }
            state.list = state.list.flat(2)
        }
        if(type == 1){
            await getIncomeList({type})
            state.list = state.list.flat(2)
        }
        if(type == 2){
            await getTransferList()
            state.list = state.list.flat(2)
        }
        if(type == 3){
            await getIncomeList({type:2})
            state.list = state.list.flat(2)
        }
    }
    const getTransferList = async() => {
        state.loading = true
        const res = await transferList()
        if(res){
            state.list.push(res)
        }
        state.loading = false
    }
    const getIncomeList = async(data:any) => {
        state.loading = true
        const res:any = await incomeList(data)
        if(res){
        state.list.push(res)
        }
        state.loading = false
    }
    toCheck(0,0)
</script>
<template>
    <van-nav-bar title="我的账户" left-arrow @click-left="leftBack"/>
    <Suspense>
        <AccountInfo></AccountInfo>
    </Suspense>
    <dl>
        <dt v-for="(item,index) in tabs" :key="index" 
        :class="state.check == index ? 'active': ''" @click="toCheck(index,item.type)">{{item.text}}
        </dt>
    </dl>
    <AccountList :list="state.list"></AccountList>
</template>
<style scoped>
    :deep(.van-nav-bar__content) {
        background: #ff8e00;
    }
    :deep(.van-nav-bar__title) ,:deep(.van-icon-arrow-left:before) {
        color: #fff;
    }
    .van-hairline--bottom:after {
        border: 0;
    }
    dl{
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-around;
  }
  dl dt{
    padding: 1.47rem 0 0.59rem;
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 500;
    color: #666666;
  }
  dl dt.active{
    color:#FF8E00;
    border-bottom: 1px solid #FF8E00;
  }
</style>