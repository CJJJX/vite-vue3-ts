<script setup lang="ts">
    import PersonInfo from './components/PersonInfo.vue'
    import PersonAdvantage from './components/PersonAdvantage.vue'
    import PositionType from '@/views/my/resume/components/PositionType.vue'
    import ExcellentSkill from './components/ExcellentSkill.vue'
    import WorkExperience from './components/WorkExperience.vue'
    import ProjectExperience from './components/ProjectExperience.vue'
    import EducationalExperience from './components/EducationalExperience.vue'
    import {myStore} from '@/store/my'
    const leftBack = () => history.back()
    const store = myStore()
    store.getResumeDetail()
</script>
<template>
    <van-nav-bar title="我的简历" left-arrow @click-left="leftBack"/>
    <div class="resume">
        <PersonInfo :item="store.resumeInfo" page="preview"></PersonInfo>
        <PersonAdvantage page="preview"></PersonAdvantage>
        <PositionType page="preview"></PositionType>
        <ExcellentSkill page="preview"></ExcellentSkill>
        <WorkExperience page="preview"></WorkExperience>
        <ProjectExperience page="preview"></ProjectExperience>
        <EducationalExperience page="preview"></EducationalExperience>
    </div>
    
</template>
<style scoped>
.resume{
    height: calc(100vh - 46px);
    overflow: auto;
  }
</style>