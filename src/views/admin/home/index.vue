<script setup lang="ts">
    import {reactive} from 'vue'
    import FooterTabbar from '@/components/FooterTabbar.vue'
    import CharLine from './components/CharLine.vue'
    import CharBar from './components/CharBar.vue'
    import CharPie from './components/CharPie.vue'
    import {adminHomeChart} from '@/api/admin'
    const state:any = reactive({
        chartData: {}
    })
    const getAdminChart = async() => {
        const res = await adminHomeChart({})
        if(res){
            state.chartData = res
        }
    }
    getAdminChart()
</script>
<template>
    
    <div class="admin-page">
        <van-nav-bar title="首页"/>
            <div class="admin-banner">
            <img src="@/assets/img/admin/home/banner.png" />
            <p>轻松管理项目进度，提高审核效率</p>
        </div>
        <div class="admin-title">
            <h3>工作管理<i></i></h3>
        </div>
        <div class="admin-job">
            <router-link to="/admin/home/contract">
                <img src="@/assets/img/admin/home/icon-contract.png" />
                <h4>合约管理<span>合约进度管理</span></h4>
            </router-link>
            <router-link to="/admin/home/auditor">
                <img src="@/assets/img/admin/home/icon-auditor.png" />
                <h4>审核管理<span>任务/认证管理</span></h4>
            </router-link>
            <router-link to="/admin/home/pay">
                <img src="@/assets/img/admin/home/icon-pay.png" />
                <h4>发薪管理<span>合约薪资管理</span></h4>
            </router-link>
            <router-link to="/admin/home/user">
                <img src="@/assets/img/admin/home/icon-user.png" />
                <h4>用户管理<span>入驻用户/企业</span></h4>
            </router-link>
        </div>
        <div class="admin-title">
            <h3>合约数据(周)<i></i></h3>
            <dl>
                <dt>上周</dt>
                <dd>下周</dd>
            </dl>
        </div>
        <CharLine v-if="state.chartData.line" :data="state.chartData.line"></CharLine>
        <div class="admin-title">
            <h3>新增入驻(周)<i></i></h3>
            <dl>
              <dt>人才</dt>
              <dd>企业</dd>
            </dl>
        </div>
        <CharBar v-if="state.chartData.bar" :data="state.chartData.bar"></CharBar>
        <div class="admin-title">
            <h3>人才年龄比例<i></i></h3>
        </div>
        <CharPie v-if="state.chartData.pie" :data="state.chartData.pie"></CharPie>
    </div>
    <FooterTabbar></FooterTabbar>
</template>
<style scoped>
.van-nav-bar{
    background: #f6f6f6;
}
.admin-page{
    padding: 0 0.64rem 3rem;
    background: #f6f6f6;
    min-height: 100vh;
}
.admin-banner{
    position: relative;
}
.admin-banner img{
    width: 100%;
}
.admin-banner p{
    position: absolute;
    font-size: 0.69rem;
    font-weight: 300;
    color: #fff;
    top: 3.1rem;
    left: 1.2rem;
}
.admin-job{
    overflow: hidden;
}
.admin-job a{
    float: left;
    width: 49%;
    height: 4.45rem;
    background: #fff;
    border-radius: 0.53rem;
    margin-right: 2%;
    margin-bottom: 0.56rem;
    display: flex;
    align-items: center;
}
.admin-job a:nth-child(2n){
    margin-right: 0;
}
.admin-job a img{
    width: 2.45rem;
    height: 2.45rem;
    margin: 0 0.56rem 0 0.72rem;
}
.admin-job a h4{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 400;
    color: #333;
}
.admin-job a h4 span{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 400;
    color: #333;
    margin-top: 0.45rem;
    display: block;
}
.admin-title{
    display: flex;
    align-items: center;
    margin-bottom: 0.67rem;
    margin-top: 1.44rem;
  }
  .admin-title h3{
    flex: 1;
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-weight: bold;
    color: #333333;
    position: relative;
  }
  .admin-title h3 i{
    width: 1.87rem;
    height: 0.64rem;
    background: linear-gradient(90deg,#fe8f27,#fff);
    opacity: 0.46;
    border-radius: 0.32rem;
    position: absolute;
    left: -0.1rem;
    top: 0.5rem;
    opacity: 0.4;
  }
   .admin-title dl{
    display: flex;
    font-size: 0.59rem;
    line-height: 0.59rem;
    font-weight: 400;
    color: #666666;
  }
  .admin-title dl dt{
    margin-right: 0.77rem;
  }
  .admin-title dl dt::before{
    content: '';
    width: 0.37rem;
    height: 0.37rem;
    background: #6DA6EA;
    border-radius: 50%;
    margin-right: 0.24rem;
    display: inline-block;
  }
  .admin-title dl dd::before{
    content: '';
    width: 0.37rem;
    height: 0.37rem;
    background: #FBC605;
    border-radius: 50%;
    margin-right: 0.24rem;
    display: inline-block;
  }
</style>
