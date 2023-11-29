<script setup lang="ts">
    import { reactive } from 'vue';
    import {useRouter} from 'vue-router'
    import {  getTalentDetail,addResumeCollect,deleteResumeCollect } from '@/api/talent';
    import EduExperience from './components/EduExperience.vue'
    import ProjectExperience from './components/ProjectExperience.vue'
    import WorkExperience from './components/WorkExperience.vue'
    import TalentInfo from './components/TalentInfo.vue'
    import { showToast } from 'vant';
    
    const router  = useRouter()
    const id = router.currentRoute.value.params.id
    const state:any = reactive({
        item: {},
        status: 0,
        loading: false,
        companyList: [],
        projectList: []
    })
    const leftBack = () => history.back();
    const gotoMessage = () => {
        router.push('/message/talent/'+state.item.id +'/'+state.item.uid)
    }
    const getTalentDetailList = async () => {
        state.loading = true
        const res = await getTalentDetail({
                id: id
        })
        if(res){
            state.item = res.data[0].info[0]
            state.item.projectNum = res.data[0].projectList.length
            state.projectList = res.data[0].projectList
            state.companyList = res.data[0].companyList
            state.status = state.item.status
        }
        state.loading = false
    }
    getTalentDetailList()
    const setResumeCollection = async () => {
        state.loading = true
        if(state.status === 0){
            const res:any = await addResumeCollect({
                resume_id: id
        })
        if(res){
            showToast(res.msg)
        }
        }else{
             const res = await deleteResumeCollect({
                id: id
        })
        if(res)
            showToast('取消收藏')
        }
        state.loading = false
        getTalentDetailList()
    }
</script>
<template>
    <van-nav-bar title="人才详情" left-arrow @click-left="leftBack"/>
    <div class="detail-page" v-if="state.item.id">
        <TalentInfo :item="state.item"></TalentInfo>
        <WorkExperience :companyList="state.companyList"></WorkExperience>
        <ProjectExperience :projectList="state.projectList"></ProjectExperience>
        <EduExperience :item="state.item"></EduExperience>
    </div>
    
    <div class="task-detail-footer">
        <van-action-bar-icon :class="state.status==1?'active':''" icon="star-o" text="收藏" @click="setResumeCollection" />
        <van-button type="primary" block @click="gotoMessage">立即沟通</van-button>
    </div>
</template>
<style scoped>
  :deep() .van-nav-bar__content{
    background: #FF8E00;
  }
  :deep() .van-nav-bar__title,:deep() .van-icon-arrow-left:before{
    color: #ffffff;
  }
  .van-hairline--bottom:after{
    border: 0;
  }
  .detail-page{
    margin: 0.53rem;
    padding-bottom: 2rem;
  }
.task-detail-footer{
    display: flex;
    position: fixed;
    left: 0;
    width: 100%;
    align-items: center;
    background: #ffffff;
    bottom: 0;
    padding: 0.64rem 0;
}
.task-detail-footer button{
    margin-right: 0.64rem;
}
.task-detail-footer .active :deep() .van-icon-star-o:before{
    color: #FE8F27;
}
</style>