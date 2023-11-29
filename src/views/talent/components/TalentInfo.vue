<script setup lang="ts">
const props:any = defineProps({
    item:{
        type:Object
    }
})
const arrayList = (str:any) => {
    if(str){
        return str.split(',')
    }else{
        return []
    }
}
</script>
<template>
    <div class="talent-info">
        <div class="info-left">
            <img :src="props.item.it_head" />
            <span>精选人才</span>
        </div>
        <div class="info-right">
            <h3>{{props.item.user_name}} <span v-for="(child,index) in arrayList(props.item.service_mode)" :key="index">{{child}}</span></h3>
            <p>{{props.item.position_name}} | {{props.item.sex==1?'男':'女'}}</p>
            <dl>
                <dt>
                    <h5>{{props.item.work_year}}</h5>
                    <span>经验</span>
                </dt>
                <dt>
                    <h5>{{props.item.age}}</h5>
                    <span>年龄</span>
                </dt>
                <dt>
                    <h5>{{props.item.projectNum}}</h5>
                    <span>项目</span>
                </dt>
            </dl>
        </div>
    </div>
    <p class="info-text">{{props.item.advantage}}</p>
    <dl class="info-skill">
        <dt v-for="(child,index) in arrayList(props.item.skill_ids)" :key="index">{{child}}</dt>
    </dl>
</template>
<style scoped>
.talent-info{
    padding: 1.23rem 1.33rem;
    background: #FFFFFF;
    box-shadow: 0rem 0rem 1rem 0rem rgba(49,57,73,0.1);
    border-radius: 0.53rem;
    display: flex;
    margin-bottom: 1.28rem;
  }
  .info-left{
    display: flex;
    flex-flow: column;
    margin-right: 1.41rem;
  }
  .info-left img{
    width: 3.47rem;
    height: 3.47rem;
    border-radius: 0.27rem;
    margin-bottom: 0.72rem;
  }
  .info-left span{
    width: 3.31rem;
    height: 1.08rem;
    line-height: 1.08rem;
    background: linear-gradient(90deg, #FEA829, #FE8F27);
    border-radius: 0.54rem;
    font-size: 0.59rem;
    text-align: center;
    font-weight: 300;
    color: #FFFFFF;
  }
  .info-right{
    flex: 1;
  }
  .info-right h3{
    font-size: 1.12rem;
    line-height: 1.12rem;
    font-weight: 400;
    color: #333333;
    margin-bottom: 0.45rem;
  }
  .info-right h3 span{
    width: 1.97rem;
    height: 0.85rem;
    border-radius: 0.43rem;
    margin-left: 0.2rem;
    font-size: 0.59rem;
    line-height: 0.85rem;
    padding: 0 0.43rem;
    font-weight: 300;
    color: #FFFFFF;
  }
  .info-right h3 span:nth-child(1){
    background: linear-gradient(90deg, #FEA829, #FE8F27);
  }
  .info-right h3 span:nth-child(2){
    background: linear-gradient(90deg, #55EDB9, #52DEA4);
  }
  .info-right h3 span:nth-child(3){
    background: linear-gradient(90deg, #42C3E8, #249AF6);
  }
  .info-right p{
    font-size: 0.69rem;
    line-height: 0.69rem;
    font-weight: 300;
    color: #333333;
    margin-bottom: 0.85rem;
  }
  .info-right dl{
    display: flex;
  }
  .info-right dl dt{
    position: relative;
    flex: 1;
  }
  .info-right dl dt h5{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 400;
    color: #333333;
    margin-bottom: 0.37rem;
  }
  .info-right dl dt span{
    font-size: 0.64rem;
    line-height: 0.64rem;
    font-weight: 100;
    color: #999999;
  }
  .info-right dl dt::before{
    border-right: 1px solid #E8E8E8;
    content: '';
    height: 100%;
    position: absolute;
    right: 30%;
    transform: skew(-15deg);
  }
  .info-text{
    font-size: 0.69rem;
    font-weight: 100;
    color: #333333;
    line-height: 1.01rem;
    margin-bottom: 0.69rem;
  }
  .info-skill dt{
    font-size: 0.59rem;
    line-height: 0.59rem;
    padding: 0.4rem 0.48rem;
    font-weight: 300;
    color: #666666;
    background: #F6F7F8;
    border-radius: 0.16rem;
    display: inline-block;
    margin-right: 0.3rem;
  }
</style>
