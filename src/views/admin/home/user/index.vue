<script setup lang="ts">
    import {reactive} from 'vue'
    import {adminUserUserList,adminUserUserConfirm,adminUserCompanyList,adminUserCompanyConfirm} from '@/api/admin'
    import { showToast } from 'vant';
    import Tabs from '@/components/Tabs.vue'
    const leftBack = () => history.back();
    const tabs = [
        {
            type: 0,
            text: '人才管理'
        },
        {
            type: 1,
            text: '企业管理'
        }
    ]
    const state:any = reactive({
        loading: false,
        type: 0,
        userList: [],
        companyList: []
    })
    const setTabList = (type:any) => {
        if(type === state.type) return
        state.type = type
        if(state.type === 0) getAdminUserUserList()
        if(state.type === 1) getAdminUserCompanyList()
    }
    const userConfirm = async (item:any,type:any) => {
        const res = await adminUserUserConfirm({
            "id": item.id,
            "type": type
        })
        if(res){
            showToast('操作成功')
            getAdminUserUserList()
        }
    }
    const companyConfirm = async (item:any,type:any) => {
        const res = await adminUserCompanyConfirm({
            "id": item.id,
            "type": type
        })
        if(res){
            showToast('操作成功')
            getAdminUserCompanyList()
        }
    }
    const getAdminUserUserList = async () => {
        state.loading = true
        const res:any = await adminUserUserList({})
        if(res){
            state.userList = res
        }else{
            showToast(res.msg)
        }
        state.loading = false
    } 
    const getAdminUserCompanyList = async () => {
        state.loading = true
        const res:any = await adminUserCompanyList({})
        if(res){
            state.companyList = res
        }else{
            showToast(res.msg)
        }
        state.loading = false
    }
    getAdminUserUserList()
</script>
<template>
<div class="wy-admin-page">
    <van-nav-bar title="用户管理" left-arrow @click-left="leftBack"/>
    <Tabs :tabs="tabs" @tabsCall="setTabList"></Tabs>
    <div v-if="state.type === 0">
        <van-pull-refresh v-model="state.loading" @refresh="getAdminUserUserList">
            <dl v-for="(item,index) in state.userList" :key="index">
                <dt>
                    <h3>
                        {{item.real_name}}
                        <i v-if="item.isdelete === 1">正常</i>
                        <i v-if="item.isdelete === 0">禁用</i>
                    </h3>
                </dt>
                <dt>
                    <label>账号：</label>
                    <span>{{item.accounts}}</span>
                </dt>
                <dt>
                    <label>性别：</label>
                    <span>{{item.sex}}</span>
                </dt>
                <dd>
                    <button v-if="item.isdelete == 1" @click="userConfirm(item,0)">禁用</button>
                    <button v-if="item.isdelete == 0" @click="userConfirm(item,1)">恢复</button>
                </dd>
            </dl>
            <van-loading v-if="state.loading">加载中...</van-loading>
            <div class="wy-no-data" v-if="!state.loading && state.userList.length==0">暂无数据</div>
        </van-pull-refresh>
    </div>
    <div v-if="state.type === 1">
        <van-pull-refresh v-model="state.loading" @refresh="getAdminUserCompanyList">
            <dl v-for="(item,index) in state.companyList" :key="index">
                <dt>
                    <h3>
                        {{item.company_name}}
                        <i v-if="item.isdelete == 0">禁用</i>
                        <i v-if="item.isdelete == 1">启用</i>
                    </h3>
                </dt>
                <dt>
                    <label>企业法人：</label>
                    <span>{{item.contacts}}</span>
                </dt>
                <dt>
                    <label>机构代码：</label>
                    <span>{{item.organization_code}}</span>
                </dt>
                <dt>
                    <label>联系电话：</label>
                    <span>{{item.phone}}</span>
                </dt>
                <dd>
                    <button v-if="item.isdelete == 0" @click="companyConfirm(item,1)">恢复</button>
                    <button v-if="item.isdelete == 1" @click="companyConfirm(item,0)">禁用</button>
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
        margin-bottom: 0.4rem;
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