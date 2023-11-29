<script setup lang="ts">
    import { useRouter } from 'vue-router'
    const props = defineProps({
        talentList:{
            type: Array<any>,
            default: ()=>[]
        }
    })
    const router = useRouter()
    const gotoDetail = (id:any) => router.push('/talent/details/'+id)
    const arrayList = (str:any) => {
        if(str){
            return str.split(',')
        }else{
            return []
        }
    }
</script>
<template>
    <div class="talent-item" v-for="(item,index) in props.talentList" :key="index" @click="gotoDetail(item.resume_id||item.id)">
        <div class="talent-item-top">
            <div class="talent-item-pic">
                <img :src="item.it_head">
            </div>
            <div class="talent-item-cont">
                <h3>{{item.user_name}}<span v-for="(child,index) in arrayList(item.service_mode)" :key="index">{{child}}</span></h3>
                <p>{{item.position_name}} | {{item.work_year}} | {{item.highest_education}} | {{item.age}}</p>
                <dl>
                    <dt v-for="(child,index) in arrayList(item.skill_ids)" :key="index">{{child}}</dt>
                </dl>
            </div>
        </div>
        <div class="talent-item-bottom">
            <label>已做{{item.project_count}}个项目</label>
            <span><van-icon name="location-o" />{{item.city}}</span>
        </div>
    </div>
    
</template>
<style scoped>
.talent-item{
    margin: 0 0rem 0.53rem;
    padding: 0.77rem 0.64rem 0;
    background: #FFFFFF;
    border-radius: 0.53rem;
    font-size: 0.69rem;
}
.talent-item-top{
    display: flex;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #f5f5f5;
}
.talent-item-pic{
    width: 4rem;
    height: 4rem;
    border-radius: 0.27rem;
    overflow: hidden;
    margin-right: 0.85rem;
}
.talent-item-pic img{
    width: 100%;
    height: 100%;
}
.talent-item-cont h3{
    font-size: 0.91rem;
    font-weight: 400;
    color: #333333;
    display: flex;
    align-items: center;
    margin-bottom: 0.64rem;
}
.talent-item-cont h3 span{
    width: 1.97rem;
    height: 0.85rem;
    line-height: 0.85rem;
    border-radius: 0.53rem;
    font-size: 0.59rem;
    font-weight: 300;
    color: #FFFFFF;
    margin-left: 0.2rem;
    text-align: center;
    padding: 0.1rem 0;
}
.talent-item-cont h3 span:nth-child(1){
    background: linear-gradient(90deg, #FEA829, #FE8F27);
}
.talent-item-cont h3 span:nth-child(2){
    background: linear-gradient(90deg, #55EDB9, #52DEA4);
}
.talent-item-cont h3 span:nth-child(3){
    background: linear-gradient(90deg, #42C3E8, #249AF6);
}
.talent-item-cont p{
    font-size: 0.69rem;
    line-height: 0.69rem;
    font-weight: 100;
    color: #666666;
    margin-bottom: 0.56rem;
}
dl{
    display: flex;
    flex-flow: wrap;
}
dl dt{
    padding: 0.3rem 0.5rem;
    font-size: 0.59rem;
    line-height: 0.59rem;
    font-weight: 300;
    color: #666666;
    margin-right: 0.27rem;
    background: #F6F7F8;
    border-radius: 0.16rem;
    margin-bottom: 0.3rem;
}
.talent-item-bottom{
    display: flex;
    padding: 0.72rem 0 0.72rem;
}
.talent-item-bottom label{
    flex: 1;
}
.talent-item-bottom span{
    text-align: right;
}
.talent-item-bottom i{
    font-size: 0.8rem;
    font-weight: 600;
    margin-right: 0.1rem;
}
</style>