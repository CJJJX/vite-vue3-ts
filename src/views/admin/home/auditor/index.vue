<script setup lang="ts">
    import {reactive} from 'vue'
    import {adminAuditorTaskList,adminAuditorTalentList,adminAuditorCompanyList} from '@/api/admin'
    import { showToast } from 'vant';
    import Tabs from '@/components/Tabs.vue'
    import {useRouter} from 'vue-router'
    const router = useRouter()
    const leftBack = () => history.back();
    const tabs = [
        {
            type: 0,
            text: '任务审核'
        },
        {
            type: 1,
            text: '个人认证'
        },
        {
            type: 2,
            text: '企业认证'
        }
    ]
    const state:any = reactive({
        loading: false,
        type: 0,
        taskList: [],
        talentList: [],
        companyList: [],
        bool: false,
        selectType: 0,
        selectId: 0
    })
    const setTabList = (type:any) => {
        if(type === state.type) return
        state.type = type
        if(state.type === 0) getAdminAuditorTaskList()
        if(state.type === 1) getAdminAuditorTalentList()
        if(state.type === 2) getAdminAuditorCompanyList()
    }
    const getAdminAuditorTaskList = async () => {
        state.loading = true
        const res:any = await adminAuditorTaskList({})
        if(res){
            state.taskList = res.records
        }else{
            showToast(res.msg)
        }
        state.loading = false
    } 
    const getAdminAuditorTalentList = async () => {
        state.loading = true
        const res:any = await adminAuditorTalentList({})
        if(res){
            state.talentList = res
        }else{
            showToast(res.msg)
        }
        state.loading = false
    } 
    const getAdminAuditorCompanyList = async () => {
        state.loading = true
        const res:any = await adminAuditorCompanyList({})
        if(res){
            state.companyList = res
        }else{
            showToast(res.msg)
        }
        state.loading = false
    } 
    const gotoDetail = (id:any) =>{
        if(state.type === 0) router.push('/admin/home/auditor/task/'+id)
        if(state.type === 1) router.push('/admin/home/auditor/talent/'+id)
        if(state.type === 2) router.push('/admin/home/auditor/company/'+id)
    }
    getAdminAuditorTaskList()
</script>
<template>
<div class="wy-admin-page">
    <van-nav-bar title="审核管理" left-arrow @click-left="leftBack"/>
    <Tabs :tabs="tabs" @tabsCall="setTabList"></Tabs>
    <div v-if="state.type === 0">
        <van-pull-refresh v-model="state.loading" @refresh="adminAuditorTaskList">
            <dl v-for="(item,index) in state.taskList" :key="index" @click="gotoDetail(item.task_id)">
                <dt>
                    <h3>
                        {{item.task_name}}
                        <i v-if="item.is_check === 0">未审核</i>
                        <i v-if="item.is_check === 1">审核通过</i>
                        <i v-if="item.is_check === 2">审核失败</i>
                        <i v-if="item.is_check === 3">已关闭</i>
                    </h3>
                </dt>
                <dt>
                    <label>任务预算：</label>
                    <span>{{item.task_budget}}元</span>
                </dt>
                <dt>
                    <label>任务周期：</label>
                    <span>{{item.task_cycle}}天</span>
                </dt>
                <dt>
                    <label>服务方式：</label>
                    <span>{{item.service_mode}}</span>
                </dt>
                <dt>
                    <label>任务要求：</label>
                    <span>{{item.task_ask}}</span>
                </dt>
                <dd>
                    <button>操作审核</button>
                </dd>
            </dl>
            <van-loading v-if="state.loading">加载中...</van-loading>
            <div class="wy-no-data" v-if="!state.loading && state.taskList.length==0">暂无数据</div>
        </van-pull-refresh>
    </div>
    <div v-if="state.type === 1">
        <van-pull-refresh v-model="state.loading" @refresh="getAdminAuditorTalentList">
            <dl v-for="(item,index) in state.talentList" :key="index" @click="gotoDetail(item.id)">
                <dt class="auditor-flex">
                    <div>
                        <img :src="item.it_head" />
                    </div>
                    <div class="auditor-flex-right">
                        <h3>
                            {{item.real_name}}
                            <i v-if="item.is_check === 0">未审核</i>
                            <i v-if="item.is_check === 1">审核通过</i>
                            <i v-if="item.is_check === 2">审核失败</i>
                        </h3>
                        <span>{{item.sex}} ｜ {{item.age}} ｜ {{item.work_year}} ｜ {{item.city}}</span>
                    </div>
                </dt>
                <dd>
                    <button>操作审核</button>
                </dd>
            </dl>
            <van-loading v-if="state.loading">加载中...</van-loading>
            <div class="wy-no-data" v-if="!state.loading && state.talentList.length==0">暂无数据</div>
        </van-pull-refresh>
    </div>
    <div v-if="state.type === 2">
        <van-pull-refresh v-model="state.loading" @refresh="getAdminAuditorCompanyList">
            <dl v-for="(item,index) in state.companyList" :key="index" @click="gotoDetail(item.id)">
                <dt>
                    <h3>
                        {{item.company_name}}
                        <i v-if="item.is_check === 0">未审核</i>
                        <i v-if="item.is_check === 1">审核通过</i>
                        <i v-if="item.is_check === 2">审核失败</i>
                    </h3>
                </dt>
                <dt>
                    <label>企业法人:</label>
                    <span>{{item.contacts}}</span>
                </dt>
                <dd>
                    <button>操作审核</button>
                </dd>
            </dl>
            <van-loading v-if="state.loading">加载中...</van-loading>
            <div class="wy-no-data" v-if="!state.loading && state.companyList.length==0">暂无数据</div>
        </van-pull-refresh>
    </div>
</div>
</template>
<style scoped>
    .wy-admin-page{
        background: #f6f6f6;
        height: 100vh;
        overflow: auto;
    }
    .auditor-flex{
        display: flex;
        align-items: center;
    }
    .auditor-flex-right{
        flex: 1;
    }
    .auditor-flex img{
        width: 2.67rem;
        height: 2.67rem;
        border-radius: 50%;  
        margin-right: 0.8rem;
    }
    dl{
        background: #FFFFFF;
        border-radius: 0.53rem;
        margin: 0 0.59rem 0.53rem;
        padding: 0.88rem 0.48rem 0.64rem;
    }
    dt{
        margin-bottom: 0.48rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    dt h3{
        font-size: 0.91rem;
        line-height: 0.91rem;
        font-weight: 400;
        color: #333333;
        margin-bottom: 0.83rem;
    }
    dt h3 i{
        font-style: normal;
        font-size: 0.64rem;
        line-height: 0.64rem;
        font-weight: 400;
        color: #FE9215;
        float: right;
    }
    dt label{
        font-size: 0.69rem;
        line-height: 0.69rem;
        font-weight: 300;
        color: #666666;
        padding-right:0.48rem;
    }
    dt span{
        font-size: 0.69rem;
        line-height: 0.69rem;
        font-weight: 300;
        color: #333333;
    }
    dd{
        border-top: 1px solid #F5F5F5;
        overflow: hidden;
        padding: 0.53rem 0rem 0 0;
        margin-top: 0.68rem;
    }
    dd button{
        border: none;
        width: 4rem;
        height: 1.39rem;
        background: #FE9215;
        border-radius: 0.16rem;
        font-size: 0.69rem;
        font-weight: 100;
        color: #FFFFFF;
        text-align: center;
        float: right;
    }
</style>