<script  setup lang="ts">
    import useClipBoard from 'vue-clipboard3'
    import {showToast} from 'vant'
    const props = defineProps({
        item:{
            type:Object as any
        }
    })
    const {toClipboard} = useClipBoard()
    const emits = defineEmits(['back'])
    const shareLink = () => {
        toClipboard(props.item.manage_name)
        showToast('复制成功')
    }
</script>
<template>
    <div class="manager-popup">
        <div class="manager-top">
            <img :src="props.item.manage_it_head" />
            <p>客户经理</p>
        </div>
            <dl>
                <dd>
                    <label>电话: </label>
                    <span>{{props.item.manage_name}}</span>
                    <strong @click="shareLink">复制</strong>
                </dd>
                 <dd>
                    <label>微信: </label>
                    <span>{{props.item.manage_name}}</span>
                    <strong @click="shareLink">复制</strong>
                </dd>
                <button @click="emits('back')">返回</button>
            </dl>
        
    </div>
</template>
<style scoped>
.manager-popup{
    width: 13.07rem;
    height: 15.42rem;
    background: url(@/assets/img/my/manager-back.png) no-repeat;
    background-size: 100%;
    text-align: center;
  }
  .manager-top img{
    width: 2.19rem; 
    height: 2.19rem; 
    border-radius: 50%;
    margin: 1.55rem 0 0.67rem;
  }
  .manager-top p{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 400;
    color: #FFFFFF;
    margin-bottom: 2.96rem;
  }
  dl{
    font-size: 0.8rem;
    padding: 0 1.33rem 0 1.6rem;
  }
  dd{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.04rem;
  }
  dd label{
    color: #999999;
  }
  dd span{
    color: #333333;
  }
  dd strong{
    color: #FF9415;
  }
  button{
    width: 10.21rem;
    height: 1.92rem;
    border: 1px solid #FF6F00;
    border-radius: 0.16rem;
    font-size: 0.85rem;
    line-height: 1.92rem;
    text-align: center;
    background: #ffffff;
    font-weight: 400;
    color: #FF6F00;
  }
</style>