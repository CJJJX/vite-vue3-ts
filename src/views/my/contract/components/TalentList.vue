<script setup lang="ts">
  import {inject,reactive} from 'vue'
  import {getTalent} from '@/api/talent'
  const {closeTalent} = inject('popup') as any
  const state:any = reactive({
    value: '',
    list: []
  })
  const getTalentList = async () =>{
    const res:any = await getTalent({})
    if(res){
        state.list = res.records
    }
  }
  getTalentList()
</script>
<template>
    <van-nav-bar title="选择人才" left-arrow @click-left="closeTalent('')"/>
    <div class="talent-small">
        <div class="talent-small-item" v-for="(item,index) in state.list" :key="index" @click="closeTalent(item)">
            <img :src="item.it_head" />
            <div class="small-item-text">
                <h3>{{item.user_name}}<i>自营</i></h3>
                <p>{{item.position_name}} ｜{{item.sex==1?'男':'女'}} ｜ {{item.work_year}} ｜ {{item.highest_education}} ｜{{item.age}}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.talent-small-item{
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    align-items: center;
    padding: 0.88rem 0.93rem
}
.talent-small-item img{
    width: 2.67rem;
    height: 2.67rem;
    background: #F6F5F5;
    border-radius: 50%;
    margin-right: 0.75rem;
}
.small-item-text h3{
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-weight: 300;
    color: #333333;
    margin-bottom: 0.48rem;
}
.small-item-text h3 i{
    width: 1.97rem;
    height: 0.85rem;
    line-height: 0.85rem;
    display: inline-block;
    background: linear-gradient(90deg, #FEA829, #FE8F27);
    border-radius: 1.5rem 1rem 1rem 1rem;
    font-size: 0.59rem;
    font-weight: normal;
    color: #FFFFFF;
    font-style: normal;
    text-align: center;
    margin-left: 0.64rem;
}
.small-item-text p{
    font-size: 0.69rem;
    line-height: 0.69rem;
    font-weight: 100;
    color: #333333;
}
</style>