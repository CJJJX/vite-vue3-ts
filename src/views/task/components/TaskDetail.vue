<script setup lang="ts">

    const props = defineProps({
        item: {
            type: Object,
            default: ()=>{}
        }
    })
</script>
<template>
    <div class="task-detail">
        <h3>{{props.item.task_name}}</h3>
        <p class="task-h3-text">{{item.position_name}}</p>
        <dl>
            <dt>
                <p>任务预算</p>
                <strong>￥{{item.task_budget}}元</strong>
            </dt>
            <dt>
                <p>任务周期</p>
                <strong>{{item.task_cycle}}天</strong>
            </dt>
            <dt>
                <p>服务方式</p>
                <strong>{{item.service_mode}}</strong>
            </dt>
        </dl>
        <h4>任务信息</h4>
        <h5>任务要求</h5>
        <p class="task-h5-text">{{item.task_ask}}</p>
        <h4>工作保障</h4>
        <img class="task-job" src="@/assets/img/task/details-guarantee.png" alt="">
        <h4>任务来源</h4>
        <router-link class="task-source" :to="'/task/companySource/'+item.company_id">
            <img :src="item.head_img" alt="">
            <div>
                <h5>{{item.company_name}}</h5>
                <p>{{item.user_name}} . {{item.city}}</p>
            </div>
        </router-link>
    </div>
</template>
<style scoped>
   .task-detail{
    padding: 0.64rem;
    font-size: 0.69rem;
    font-weight: 100;
    color: #666666;
}
h3{
    font-size: 1.12rem;
    line-height: 1.12rem;
    font-weight: 400;
    color: #333333;
    margin-bottom: 0.93rem;
}
.task-h3-text{
    line-height: 0.69rem;
    padding-bottom: 0.85rem;
    margin-bottom: 1.23rem;
    border-bottom: 1px solid #f0f0f0;
}
dl{
    display: flex;
    padding-bottom: 1.12rem;
    margin-bottom: 1.55rem;
    border-bottom: 1px solid #f0f0f0;
    padding-right: 2rem;
}
dl dt{
    flex: 1;
}
dl dt p{
    margin-bottom: 0.56rem;
    line-height: 0.69rem;
}
dl dt strong{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #FF9415;
}
h4{
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-weight: 400;
    color: #333333;
    margin-bottom: 0.61rem;
}
h5{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 300;
    color: #333333;
    margin-bottom: 0.8rem;
}
.task-h5-text{
    font-size: 0.69rem;
    font-weight: 100;
    color: #333333;
    line-height: 1.23rem;
    padding-bottom: 1.3rem;
    margin-bottom: 1.33rem;
    border-bottom: 1px solid #f0f0f0;
}
.task-job{
    width: 100%;
    padding-bottom: 1.44rem;
    margin-bottom: 1.36rem;
    border-bottom: 1px solid #f0f0f0;
}
.task-source{
    display: flex;
    align-items: center;
    margin-bottom: 4rem;
}
.task-source img{
    width: 2.67rem;
    height: 2.67rem;
    border-radius: 1.34rem;
    margin-right: 0.61rem;
}
.task-source h5{
    margin-bottom: 0.51rem;
}
.task-source p{
    line-height: 0.69rem;
    color: #666666;
}
</style>