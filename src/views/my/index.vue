<script setup lang="ts">
    import {reactive} from 'vue'
    import {useRouter} from 'vue-router'
    import FooterTabbar from '@/components/FooterTabbar.vue'
    import CustomerManager from './components/CustomerManager.vue'
    import {myAllCount} from '@/api/my'
    import {myStore} from '@/store/my' 
    
    const state:any = reactive({
      show:false,
      count: {}
    })
    
    const store:any = myStore()
    const router = useRouter()
    const gotoPage = (path:any) => {
        router.push(path)
    }
    if(!store.userInfo.user_name) store.getUserInfo()
    const getMyAllCount = async() => {
        const res:any = await myAllCount()
        if(res){
          state.count = res[0]
        }
  }
  getMyAllCount()
</script>
<template>
    <div class="my-page">
        <van-nav-bar title="我的" >
        <template #right>
            <van-icon name="setting-o" @click="gotoPage('/my/set')"/>
        </template>
        </van-nav-bar>
        <div class="my-info">
            <img v-if="store.userInfo.it_head" :src="store.userInfo.it_head" />
            <img v-else src="@/assets/img/icon/icon-message.png" />
            <div @click="gotoPage('/my/user')">
                <h3>{{store.userInfo.user_name}}<span></span></h3>
                <p>{{store.userInfo.role===1? 'it企业人才' : store.userInfo.role===3 ? '企业端' : '管理端'}}</p>
            </div>
            <i v-if="store.userInfo.role!==2" @click="gotoPage('/my/account')"></i>
        </div>
        <div class="my-type" v-if="store.userInfo.role===1">
            <router-link to="/my/collect">
                <img src="@/assets/img/my/icon-collection.png"/>
                <span>我的收藏</span>
            </router-link>
            <router-link to="/my/resume">
                <img src="@/assets/img/my/icon-my-resume.png"/>
                <span>我的简历</span>
            </router-link>
        </div>
        <div class="my-type-enterprise" v-if="store.userInfo.role===3">
            <router-link to="/my/collect/talent">
                <img src="@/assets/img/my/icon-collection.png"/>
                <span>我的收藏</span>
            </router-link>
            <router-link to="/my/task">
                <i>{{state.count.task_count}}</i>
                <img src="@/assets/img/my/icon-task-management.png"/>
                <span>任务管理</span>
            </router-link>
            <router-link to="/my/contract/1">
                <i>{{state.count.contract_count}}</i>
                <img src="@/assets/img/my/icon-contract-management.png"/>
                <span>合约管理</span>
            </router-link>
            <router-link to="/my/coupon">
                <i>{{state.count.coupon_count}}</i>
                <img src="@/assets/img/my/icon-experience-gold.png"/>
                <span>我的体验金</span>
            </router-link>
        </div>
        <div class="my-contract" v-if="store.userInfo.role!==2">
            <div class="my-title">
                <h3>我的合约</h3>
                <span @click="gotoPage('/my/contract/0')">查看全部合约</span>
            </div>
            <div class="my-contract-cur" v-if="store.userInfo.role===1">
                <span @click="gotoPage('/my/contract/2')"><img src="@/assets/img/my/contract-be-signed.png"/>待签约</span>
                <span @click="gotoPage('/my/contract/3')"><img src="@/assets/img/my/contract-in-performance.png"/>履约中</span>
                <span @click="gotoPage('/my/contract/4')"><img src="@/assets/img/my/contract-completed.png"/>已完成</span>
                <span @click="gotoPage('/my/contract/5')"><img src="@/assets/img/my/contract-canceled.png"/>已取消</span>
            </div>
            <div class="my-contract-cur" v-if="store.userInfo.role===3">
                <span @click="gotoPage('/my/contract/1')"><img src="@/assets/img/my/contract-be-send.png"/>待发送</span>
                <span @click="gotoPage('/my/contract/2')"><img src="@/assets/img/my/contract-be-signed.png"/>待确认</span>
                <span @click="gotoPage('/my/contract/3')"><img src="@/assets/img/my/contract-in-performance.png"/>履约中</span>
                <span @click="gotoPage('/my/contract/4')"><img src="@/assets/img/my/contract-completed.png"/>已完成</span>
                <span @click="gotoPage('/my/contract/5')"><img src="@/assets/img/my/contract-canceled.png"/>已取消</span>
            </div>
        </div>
        <div class="my-common" v-if="store.userInfo.role!=2">
            <div class="my-title">
                <h3>常用功能</h3>
            </div>
            <div class="my-item" @click="gotoPage(store.userInfo.user_is_check===1?'my/user/certified':'my/user/authReal')">
                <img src="@/assets/img/my/icon-real-name-auth.png"/><label>实名认证</label>
                <span><van-icon name="arrow" /></span>
            </div>
            <div class="my-item" @click="gotoPage(store.userInfo.enterprise? 'my/company/certified': 'my/company/authReal')" v-if="store.userInfo.role===3">
                <img src="@/assets/img/my/icon-company-auth.png"/><label>企业认证</label>
                <span><van-icon name="arrow" /></span>
            </div>
            <div class="my-item" @click="state.show = true">
                <img src="@/assets/img/my/icon-account-manager.png"/><label>专属客户经理</label>
                <span><img src="@/assets/img/icon/icon-message.png"/>无忧经理<van-icon name="arrow" /></span>
            </div>
        </div>
        <div class="my-common">
            <div class="my-item" @click="gotoPage('/my/feedback')">
                <img src="@/assets/img/my/icon-feedback.png"/><label>意见反馈</label>
                <span><van-icon name="arrow" /></span>
            </div>
            <div class="my-item" @click="gotoPage('/my/about')">
                <img src="@/assets/img/my/icon-about.png"/><label>关于我们</label>
                <span><van-icon name="arrow" /></span>
            </div>
        </div>  
        <div class="my-common">
            <div class="my-item" @click="gotoPage('/my/user/identitySwitch')">
                <img src="@/assets/img/my/icon-switch-role.png"/><label>切换身份</label>
                <span>当前为{{store.userInfo.role===1? 'it企业人才身份' : store.userInfo.role===3 ? '企业端' : '管理端'}}<van-icon name="arrow" /></span>
            </div>
        </div>  
    </div>
     <!-- 客户经理弹窗-->
        <van-popup v-model:show="state.show" duration="0"  :style="{ width: '13.07rem',height: '15.44rem',borderRadius:'0.53rem' }">
          <CustomerManager @back="state.show = false" :item="store.userInfo"></CustomerManager>
        </van-popup>
    <FooterTabbar></FooterTabbar>
</template>
<style scoped>
    .col-9{
    color: #999999;
  }
  :deep(.van-nav-bar) {
    background: none;
  }
  :deep(.van-nav-bar__title) {
    color: #ffffff;
    font-size:0.96rem;
    font-weight: 600;
  }
  :deep(.van-nav-bar .van-icon) {
    font-size: 1.12rem;
    color: #ffffff;
  }
  :deep(.van-hairline--bottom:after) {
    border:0;
  }
  :deep(.van-nav-bar__right) {
    padding-right: 0;
  }
  .my-page{
    padding: 0 0.77rem 3rem;
    background: #FBFBFB url(@/assets/img/my/top-background.png) center -0.8rem no-repeat;
    background-size: contain;
    height: calc(100vh - 3rem);
    overflow: auto;
  }
  .my-info{
    display: flex;
    align-items: center;
    margin: 0.8rem 0 0.93rem;
    position: relative;
    right: -0.77rem;
  }
  .my-info img{
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    margin-right: 0.85rem;
  }
  .my-info div h3{
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-weight: 400;
    color: #FFFFFF;
    margin-bottom: 0.48rem;
  }
  .my-info div h3 span{
    width: 0.56rem;
    height: 0.56rem;
    margin-left: 0.59rem;
    display: inline-block;
    background: url(@/assets/img/my/icon-edit.png) no-repeat;
    background-size: 100%;
  }
  .my-info div p{
    font-size: 0.69rem;
    line-height: 0.69rem;
    font-weight: 400;
    color: #FFFFFF;
  }
  .my-info i{
    width: 4.91rem;
    height: 1.49rem;
    background: url(@/assets/img/my/icon-my-account.png) no-repeat;
    background-size: 100%;
    position: absolute;
    right: 0;
  }
  .my-type{
    display: flex;
    align-items: center;
    height: 3.31rem;
    background: #FFFFFF;
    box-shadow: 0rem 0rem 1rem 0rem rgba(49,57,73,0.09);
    border-radius: 0.27rem;
    margin-bottom: 0.53rem;
  }
  .my-type strong{
    width: 0.03rem;
    height: 1.95rem;
    background: #EDEDED;
    margin-left: 1.92rem;
  }
  .my-type a{
    display: flex;
    align-items: center;
    margin-left: 1.92rem;
  }
  .my-type a img{
    width: 2.24rem;
    height: 2.24rem;
    margin-right: 0.51rem;
  }
  .my-type a span{
    font-size: 0.69rem;
    line-height: 0.69rem;
    font-weight: 400;
    color: #666666;
  }
  .my-type-enterprise{
    display: flex;
    width: 18.45rem;
    height: 5.27rem;
    border-radius: 0.27rem;
    background: #ffffff;
    margin-bottom: 0.59rem;
  }
  .my-type-enterprise a{
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .my-type-enterprise a img{
    width: 2.45rem;
    height: 2.45rem;
    margin-bottom: 0.64rem;
  }
  .my-type-enterprise a span{
    font-size: 0.64rem;
    color: #333333;
  }
  .my-type-enterprise a i{
    position: absolute;
    font-style: normal;
    font-size: 0.59rem;
    color: #FFFFFF;
    width: 0.85rem;
    height: 0.85rem;
    background: #FC9215;
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    text-align: center;
    left: 50%;
    margin-left: 0.4rem;
    top: 0.6rem;
  }
  .my-contract{
    height: 7.9rem;
    background: #FFFFFF;
    border-radius: 0.27rem;
    margin-bottom: 0.59rem;
  }
  .my-title{
    height: 2.69rem;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 0 0.8rem;
  }
  .my-title h3{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 400;
    color: #333333;
    flex: 1;
  }
  .my-title span{
    text-align: right;
    font-size: 0.64rem;
    color: #464646;
  }
  .my-contract-cur{
    height: 5.17rem;
    display: flex;
    align-items: center;
    vertical-align: center;
  }
  .my-contract-cur span{
    flex: 1;
    text-align: center;
    font-size: 0.69rem;
    color: #464646;
  }
  .my-contract-cur span img{
    width: 1.39rem;
    height: 1.39rem;
    display: block;
    margin: 0 auto 0.59rem;
  }
  .my-common{
    background: #FFFFFF;
    border-radius: 0.27rem;
    margin-bottom: 0.59rem;
  }
  .my-item{
    height: 2.67rem;
    background: #FFFFFF;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 0 0.4rem 0 0rem;
    margin-left: 0.69rem;
    font-size: 0.69rem;
    color: #464646;
  }
  .my-item:last-child{
    border-bottom: 0;
  }
  .my-item img{
    width: 1.12rem;
    height: 1.12rem;
    margin-right: 0.85rem;
  }
  .my-item label{
    flex: 1;
  }
  .my-item span{
    display: flex;
    align-items: center;
    text-align: right;
  }
  .my-item span img{
    width: 1.28rem;
    height: 1.28rem;
    border-radius: 50%;
    margin-right: 0.32rem;
  }
</style>