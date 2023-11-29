<script setup lang="ts">
    import {reactive,onBeforeUnmount,provide} from 'vue'
    import {useRouter} from 'vue-router'
    import TalkWords from './components/TalkWords.vue'
    import TalkEmoji from './components/TalkEmoji.vue'
    import {chatMessageContent,chatMessageContentAdd} from '@/api/message'
    import {showToast} from 'vant'

    const leftBack = () => history.back()
    const router = useRouter()
    const taskId = router.currentRoute.value.params.taskId
    const receiveId = router.currentRoute.value.params.userId

    const state:any = reactive({
      list: '',
      loading: false,
      value: '',
      taskName: '',
      createSetInterval: null,
      worksVisible: false,
      emojiVisible: false
    })
    
    const worksClick =  () => {
      state.emojiVisible = false
      state.worksVisible = !state.worksVisible
    }
    const emojiClick = () => {
      state.emojiVisible = !state.emojiVisible
      state.worksVisible = false
    }
    // 消息发送
    const sendSubmit = async () => {
      state.loading = true
      const res:any = await chatMessageContentAdd({
        "receive_id": receiveId, 
        "things_id": taskId, 
        "content": state.value, 
        "things_type": 0 
      })
      if(res){
        getChatMessageContent()
        state.value=''
      }
      showToast(res.msg)
    }
    // 获取消息
    const getChatMessageContent = async () => {
      const res:any = await chatMessageContent({
        receive_id: receiveId,
        things_id: taskId,
        things_type: 0,
      })
      if(res){
        state.list = res.data
        state.taskName = res.data && res.data[0].task_name || '任务'
      }else{
        showToast(res.msg)
      }
    }
    getChatMessageContent()

    const createInterval = ()=> {
      stopSetInterval()
      state.createSetInterval = setInterval(()=>{
        getChatMessageContent()
      },5000)
    }
    const stopSetInterval = ()=> {
      if(state.createSetInterval){
        clearInterval(state.createSetInterval)
        state.createSetInterval = null
      }
    }

    onBeforeUnmount(()=>{stopSetInterval()})
    createInterval()

    const worksChange = (value:any)=> {
      state.value = value
      state.worksVisible = false
    }
    const emojiChange = (value:any)=> {
      state.value = state.value + value
      state.emojiVisible = false
    }
    provide('popup',{
      worksChange,
      emojiChange
    })
</script>
<template>
    <van-nav-bar :title="state.taskName" left-arrow @click-left="leftBack"/>
    <div class="talk-page">
        <dl>
            <dt v-for="(item,index) in state.list" :key="index" :class="item.receive_id==receiveId? 'active':''">
                <h5>{{item.create_time}}</h5>
                <div>
                  <img v-if="item.receive_id==receiveId" :src="item.senderPhoto"/>
                  <img v-else :src="item.receivePhoto"/>
                  <p>{{item.text}}</p>
                </div> 
            </dt>
        </dl>
    </div>
    <div class="talk-bottom">
        <div class="talk-input">
            <span @click="worksClick">常用语</span>
            <input v-model="state.value" type="text">
            <van-icon name="smile-o" @click="emojiClick"/>
            <span @click="sendSubmit">发送</span>
        </div>
        <TalkWords v-if="state.worksVisible"></TalkWords>
        <TalkEmoji v-if="state.emojiVisible"></TalkEmoji>
    </div>
</template>
<style scoped>
 .talk-page{
    width: 100%;
    background: #f3f3f3;
    height: calc(100vh - 46px - 2.6rem);
    overflow: auto;
  }
  dl{
    padding: 0.96rem 0.64rem;
  }
  dl dt{
    overflow: hidden;
  }
  dl dt h5{
    font-size: 0.64rem;
    line-height: 0.64rem;
    font-weight: 300;
    color: #999999;
    text-align: center;
    margin-bottom: 0.69rem;
  }
  dl dt div{
    display: flex;
  }
  dl dt img{
    width: 2.14rem;
    height: 2.14rem;
    border-radius: 50%;
    margin-right: 0.64rem;
  }
  dl dt p{
    width: 12.53rem;
    background: #FFFFFF;
    border: 1px solid #EFEFEF;
    border-radius: 0.11rem;
    padding: 0.4rem 0.69rem;
    margin-bottom: 1.47rem;
  }
  dl dt.active div{
    display: block;
  }
  dl dt.active img{
    float: right;
    margin-right:0;
    margin-left:0.64rem;
  }
  dl dt.active p{
    float: right;
    font-size: 0.75rem;
    font-weight: 300;
    color: #FFFFFF;
    border: 1px solid #FF9415;
    background: #FF9415;
    border-radius: 0.13rem;
    position: relative;
  }
  .talk-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: #ffffff;
    text-align: center;
    z-index: 1;
    border-top: 1px solid #eeeeee;
  }
  .talk-input{
    display: flex;
    align-items: center;
    height: 2.6rem;
  }
  .talk-input span{
    width: 2.61rem;
    height: 1.33rem;
    line-height: 1.33rem;
    background: #FF9415;
    border-radius: 0.13rem;
    font-size: 0.64rem;
    font-weight: 100;
    text-align: center;
    color: #FFFFFF;
    margin-left: 0.59rem;
  }
  .talk-input span:last-child{
    margin: 0 0.59rem 0 0;
  }
  .talk-input input{
    flex: 1;
    height: 1.8rem;
    background: #FBFBFB;
    border: 1px solid #EFEFEF;
    border-radius: 0.13rem;
    padding: 0 0.5rem;
    margin: 0 0.4rem 0 0.5rem;
  }
  .talk-input i{
    font-size: 1.36rem;
    margin-right: 0.4rem;
  }
</style>