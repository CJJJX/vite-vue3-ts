<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import ProgressBar from '@/components/ProgressBar.vue'
    const props = defineProps({
        contractList:{
            type: Array<any>,
            default: ()=>[]
        }
    })
    const router = useRouter()
    const gotoDetail = (id:any) => router.push('/contract/details/'+id)
</script>
<template>
    <dl v-for="(item,index) in props.contractList" :key="index" @click="gotoDetail(item.contract_id)">
        <dd>
            <h3>{{item.contract_name}}</h3>
            <span>{{item.is_contract_type}}</span>
        </dd>
        <dt>
            <label>公司名称</label>
            <span>{{item.company_name}}</span>
            <van-icon name="arrow"/>
        </dt>
        <dt>
            <label>合约类型</label>
            <span>{{item.contract_type}}</span>
        </dt>
        <dt>
            <label>合约周期</label>
            <span>{{item.create_time}}-{{item.end_time}}</span>
        </dt>
        <dt>
            <label>签约时间</label>
            <span>{{item.signing_time}}</span>
        </dt>
        <dt>
            <label>合约进度</label>
            <span></span>
        </dt>
        <dt>
            <ProgressBar :item="item"></ProgressBar>
        </dt>
    </dl>
</template>
<style scoped>
dl{
    font-size: 0.64rem;
    color: #666666;
    padding: 1rem 0.7rem;
    border-bottom: 1px solid #eeeeee;
}
dl dd{
    display: flex;
    margin-bottom: 0.9rem;
    align-items: center;
}
dl dd h3{
    font-size: 0.8rem;
    font-weight: 500;
    color: #333333;
    flex: 1;
}
dl dd span{
    text-align: right;
    font-size: 0.75rem;
    color: #FF9415;
}
dl dd i{
    font-size: 0.75rem;
}
dl dt{
    display: flex;
    margin-bottom: 0.72rem;
}
dl dt:last-child{
    margin-bottom: 0;
}
dl dt label{
    flex: 1;
}
dl dt span{
    text-align: right;
    font-size: 0.75rem;
    color: #FF9415;
}

</style>