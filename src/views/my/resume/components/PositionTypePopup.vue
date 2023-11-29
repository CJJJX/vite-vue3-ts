<script setup lang="ts">
    import {reactive,inject,provide} from 'vue'
    import PositionType from '../../../task/components/PositionType.vue'
    import ServiceTypePopup from './ServiceTypePopup.vue'
    import {jobIntention} from '@/api/my'
    import {myStore} from '@/store/my'
    import {showToast} from 'vant'
    const {closeChange} = inject('popup') as any
    const state:any = reactive({
        showPositionType: false,
        showServiceType: false,
        showPriceType: false,
        positionValue:'',
        serviceValue:'',
        priceValue:'',

    })
    const store:any = myStore()
    store.getResumeDict()
    state.value = store.resumeInfo.advantage
    const priceSelect = (value:any) => {
        state.priceValue = value.name
    }
    const submit = async() => {
        if(!state.positionValue){
            showToast('请选择职位类型')
            return
        }
        if(!state.serviceValue){
            showToast('请选择服务类型')
            return
        }
        if(!state.priceValue){
            showToast('请选择服务价格')
            return
        }
        const res = await jobIntention({
           "position_name": state.positionValue, 
            "service_mode": state.serviceValue, 
            "service_price": state.priceValue  
        })
        if(res){
            showToast('保存成功')
            closeChange()
        }else{
            showToast('保存失败')
        }
    }
    const closePositionType = (name:any) => {
        state.positionValue = name
        state.showPositionType = false
    }
    const closeServiceTypePopup = (name:any) => {
        if(name)
        state.serviceValue = name
        state.showServiceType = false
    }
    provide('popup',{
        closePositionType,
        closeServiceTypePopup
    })
</script>
<template>
    <van-nav-bar title="求职意愿" left-arrow @click-left="closeChange"/>
    <div class="position-list">
        <div class="user-item">
            <h5>职位类型</h5>
            <van-field v-model="state.positionValue" placeholder="请选择您的职位类型" readonly is-link @click="state.showPositionType = true"></van-field>
        </div>
        <div class="user-item">
            <h5>服务类型</h5>
            <van-field v-model="state.serviceValue" placeholder="请选择您的服务类型" readonly is-link @click="state.showServiceType = true"></van-field>
        </div>
        <div class="user-item">
            <h5>服务价格</h5>
            <van-field v-model="state.priceValue" placeholder="请选择您的服务价格" readonly is-link @click="state.showPriceType = true"/>
                <van-action-sheet v-model:show="state.showPriceType" :actions="store.salaryScope" 
                cancel-text="取消"  close-on-click-action @select="priceSelect"
                @cancel="state.showPriceType = false"/>
        </div>
    </div>
    <button class="wy-submit" @click="submit">完成</button>
    <!-- 职位类型弹出层 -->
    <van-popup v-model:show="state.showPositionType" duration="0" position="top" :style="{ width: '100%',height: '100%' }">
        <PositionType></PositionType>
    </van-popup>
    <!-- 服务类型出层 -->
    <van-popup v-model:show="state.showServiceType" duration="0" position="top" :style="{ width: '100%',height: '100%' }">
        <ServiceTypePopup></ServiceTypePopup>
    </van-popup>
</template>
<style scoped>
    .position-list{
    margin: 1.52rem 0.67rem 0;
  }
</style>