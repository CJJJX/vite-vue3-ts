<script setup lang="ts">
    const props:any = defineProps({
        companyList:{
            type: Array
        }
    })
</script>
<template>
    <div class="resume-label">
            <h3>工作经历</h3>
            <div v-if="props.companyList.length" v-for="(item,index) in props.companyList" :key="index">
                <h4>{{item.company_name}}</h4>
                <h5>{{item.work_position}}</h5>
                <p>{{item.start_time}} - {{item.end_time}}</p>
                <h5>工作描述</h5>
                <van-field 
                v-model="item.company_describe"
                autosize
                readonly
                label=""
                type="textarea" />
            </div>
    </div>
</template>
<style scoped>

</style>