<script setup lang="ts">
    import { reactive } from 'vue';
    import {  getTalent } from '@/api/talent';
    import { hotSearch } from '@/api/task'
    import { talentStore } from '@/store/talent'
    import TalentList from '@/components/list/TalentList.vue'
    import { showToast } from 'vant';
    
    const his = localStorage.getItem('searchTalent')
    const store:any = talentStore()
    const state:any = reactive({
        value: '',
        TalentList: [],
        searchHistory: his?his.split(','): [],
        searchFlag: false,
        loading: false,
        finished: false,
        pageNum: 1,
        pageSize: 10
        
    })
    const leftBack = () => history.back();
    const onCancel = () => {
        state.value=''
        state.searchFlag = false
    }    
    const onSearch = (value:string) => {
        if(!value) return
        state.searchFlag = true
        if(!state.searchHistory.includes(value)){
            state.searchHistory.push(value)
            localStorage.setItem('searchTalent',state.searchHistory)
        }
        getTalentAllList()
    }
    const gotoSearch = (item:string) => {
        state.value = item
        state.pageNum = 1
        onSearch(item)
    }
    const clearHistory = () => {
        state.searchHistory = []
        localStorage.removeItem('searchHistory')
    }
    const getHotSearch = async()=> {
       const res:any = await hotSearch({
        type: 0
       })
       if(res){
        store.setHotSearchList(res.data)
       }else{
        showToast(res.msg)
       }
    }
    if(store.hotSearchList.length <= 0) getHotSearch()
    const getTalentAllList = async () => {
        state.loading = true
        if(state.pageNum == 1)
        state.talentList = []
        const res:any = await getTalent({
          "position_name": state.value, 
          "pageNum": state.pageNum, 
          "pageSize": state.pageSize
        })
        if(res){
          state.talentList = state.talentList.concat(res.records) 
          state.loading = false
          if(state.talentList.length >= res.total){
            state.finished = true
          }else{
            state.finished = false
          }
        }else{
            showToast(res.msg)
            state.loading = false
        }
    }
    const onLoad = () => {
        state.pageNum = state.pageNum + 1
        getTalentAllList()
    }
const onRefresh = () => {
        state.pageNum = 1
        getTalentAllList()
    }
onRefresh()
</script>
<template>
<div :class="state.searchFlag?'search-page':''">
    <van-nav-bar title="搜索" left-arrow @click-left="leftBack"/>
    <div class="search-cont">
        <van-search v-model="state.value" show-action placeholder="请输入搜索的职位" @search="onSearch" @cancel="onCancel"/>
    </div>
    <div class="search-item" v-if="!state.searchFlag">
        <h3>搜索历史<van-icon name="delete-o" @click="clearHistory"/></h3>
        <dl>
            <dt v-for="(item,index) in state.searchHistory" :key="index" @click="gotoSearch(item)">{{item}}</dt>
        </dl>
        <h3>热门搜索</h3>
        <dl>
            <dt v-for="(item,index) in store.hotSearchList" :key="index" @click="gotoSearch(item.title)">{{item.title}}</dt>
        </dl>
    </div>
    <div class="search-list"  v-show="state.searchFlag">
        <van-pull-refresh v-model="state.loading" @refresh="onRefresh">
          <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="" @load="onLoad">
            <TalentList :talentList="state.talentList"></TalentList>
          </van-list>
          <div class="wy-no-data" v-if="!state.loading && state.talentList.length == 0">暂无数据</div>
        </van-pull-refresh>
    </div>
</div>
    
</template>
<style scoped>
    .search-page{
        background: #f9f9f9;
        height: 100%;
        min-height: 100vh;
    }
    .search-page .van-nav-bar {
        background: none;
    }
    :deep() .van-search__content {
        background: #f2f2f2;
        border-radius: 0.85rem;
    }
    :deep() .van-search--show-action {
        padding-left: 0px;
        background: none;
    }
    :deep() .van-search__action {
        font-size: 0.85rem;
        font-weight: 400;
        color: #666666;
        padding-right: 0px;
    }
    .search-cont{
        padding: 0 0.64rem;
    }
    h3{
        font-size: 0.8rem;
        font-weight: 500;
        color: #000000;
        line-height: 0.8rem;
        margin: 0.85rem 0 0.85rem;
        display: flex;
    }
    h3 i{
        flex: 1;
        text-align: right;
        font-size: 0.9rem;
    }
    dl dt{
        background: #F5F5F5;
        border-radius: 0.16rem;
        padding: 0.45rem;
        font-size: 0.64rem;
        line-height: 0.64rem;
        font-weight: 400;
        color: #333333;
        margin-right: 0.51rem;
        margin-bottom: 0.53rem;
        display: inline-block;
    }
</style>