<script setup lang="ts">
    const props:any = defineProps({
        projectList:{
            type: Array
        }
    })
</script>
<template>
    <div class="resume-label">
            <h3>项目经历</h3>
            <div v-if="props.projectList.length" v-for="(item,index) in props.projectList" :key="index">
            <h4>{{item.project_name}}</h4>
            <p>{{item.project_start_time}} - {{item.project_end_time}}</p>
            <h5>项目经历</h5>
            <van-field 
                v-model="item.project_duty"
                autosize
                readonly
                label=""
                type="textarea" />
        </div>
    </div>
</template>
<style scoped>

</style>