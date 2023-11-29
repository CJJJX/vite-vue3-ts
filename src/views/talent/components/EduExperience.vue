<script setup lang="ts">
const props:any = defineProps({
    item:{
        type:Object
    }
})
</script>
<template>
    <div class="resume-label">
        <h3>教育经历</h3>
        <h5>{{props.item.school_name}}</h5>
        <p>{{props.item.teach_start_time}} - {{props.item.teach_end_time}}</p>
        <h5>{{props.item.major}} | {{props.item.highest_education}}</h5>
    </div>
</template>
<style scoped>

</style>
