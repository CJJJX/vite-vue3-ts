<script setup lang="ts">
    import {reactive} from 'vue'
    import {myStore} from '@/store/my'
    import {userStore} from '@/store/user'
    import {addRole} from '@/api/my'
    import {showToast} from 'vant'
    import IdentityPopup from './IdentityPopup.vue'
    const store:any = myStore()
    const ustore = userStore()
    if(Object.keys(store.userInfo).length===0) store.getUserInfo()
    const state:any = reactive({
        show: false,
        role: store.userInfo.role,
        switchRole: store.userInfo.role
    })
    const setRole = async(role:any)=> {
        if(role === state.role) return
        let bool = false
        if(role===1 && store.userInfo.it_enterprise === 1){
            bool = true
        }
        if(role===2 && store.userInfo.manage === 1){
            bool = true
        }
        if(role===3 && store.userInfo.it_enterprise === 1){
            bool = true
        }
        if(bool){
            const res = await addRole({
                role: role
            })
            if(res){
                showToast('身份切换成功')
                store.getUserInfo()
                ustore.setRole(role)
                localStorage.setItem('role',role)
            }
        }else{
            state.switchRole = role
            state.show = true 
        }
    }
</script>
<template>
    <div class="switch-item" @click="setRole(1)">
        <div class="item-cont">
            <img src="@/assets/img/my/icon-personnel.png"/>
            <div>
                <h5>IT企业人才</h5>
                <p v-if="store.userInfo.it_enterprise!==1">未申请</p>
            </div>
        </div>
        <img class="item-back" src="@/assets/img/my/personnel-bg.png" />
        <strong v-if="store.userInfo.role === 1">当前身份</strong>
    </div> 
    <div class="switch-item" @click="setRole(2)">
        <div class="item-cont">
            <img src="@/assets/img/my/icon-controller.png"/>
            <div>
                <h5>管理端</h5>
                <p v-if="store.userInfo.manage!==1">未申请</p>
            </div>
        </div>
        <img class="item-back" src="@/assets/img/my/controller-bg.png" />
        <strong v-if="store.userInfo.role === 2">当前身份</strong>
    </div>
    <div class="switch-item" @click="setRole(3)">
        <div class="item-cont">
            <img src="@/assets/img/my/icon-enterprise.png"/>
            <div>
                <h5>企业端</h5>
                <p v-if="store.userInfo.it_enterprise!==1">未申请</p>
            </div>
        </div>
        <img class="item-back" src="@/assets/img/my/enterprise-bg.png" />
        <strong v-if="store.userInfo.role === 3">当前身份</strong>
    </div> 
    <!-- 身份切换提示弹窗-->
        <van-popup v-model:show="state.show" duration="0"  :style="{ width: '13.07rem',height: '15.44rem',borderRadius:'0.53rem' }">
          <IdentityPopup @back="state.show = false" :role="state.switchRole"></IdentityPopup>
        </van-popup>  
</template>
<style scoped>
.switch-item{
    width: 100%;
    height: 4.28rem;
    background: #FFFFFF;
    border-radius: 0.27rem;
    margin-bottom: 0.8rem;
    position: relative;
    display: flex;
  }
  .switch-item strong{
    position: absolute;
    right: 0px;
    top: 0px;
    width: 3.44rem;
    height: 0.9rem;
    background: linear-gradient(90deg, #FEA829, #FE8F27);
    border-radius: 0rem 0.3rem 0rem 0.3rem;
    font-size: 0.64rem;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
  }
  .item-back{
    position: absolute;
    right: 0.24rem;
    bottom: 0.13rem;
    width: 2.51rem;
    height: 2.77rem;
  }
  .item-cont{
    display: flex;
    align-items: center;
  }
  .item-cont img{
    width: 3.2rem;
    height: 3.2rem;
    margin-right: 0.69rem;
    margin-left: 0.48rem;
  }
  .item-cont h5{
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-weight: 500;
    color: #000000;
  }
  .item-cont p{
    color: #999999;
    font-size: 0.8rem;
    margin-top: 0.72rem;
  }
</style>
