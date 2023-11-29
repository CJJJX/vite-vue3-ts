<script setup lang="ts">
import {reactive,inject,provide} from 'vue'
import {chatMessageWordsList} from '@/api/message'
import TalkWordsAdd from './TalkWordsAdd.vue'
import TalkWordsManage from './TalkWordsManage.vue'
import {showToast} from 'vant'

    const {worksChange} = inject('popup') as any //解构出父组件提供的方法
    const state:any = reactive({
        loading: false,
        list: [],
        addBool: false,
        manageBool: false
    })

    const getChatMessageWordsList = async () => {
        state.loading = true
        const res:any = await chatMessageWordsList()
        if(res){
            state.list = res.data
        }else{
            showToast(res.msg)
        }
        state.loading = false
    }
    getChatMessageWordsList()
    const closeWorksAdd = ()=> {
      state.addBool = false
      getChatMessageWordsList()
    }
    const closeWorksManage = ()=> {
      state.manageBool = false
      getChatMessageWordsList()
    }
    provide('popup',{closeWorksAdd,closeWorksManage})
</script>
<template>
    <div class="talk-word">
        <dl>
            <dt v-for="(item,index) in state.list" :key="index" @click="worksChange(item.text)">{{item.text}}</dt>
        </dl>
        <div class="talk-word-btn">
            <p @click="state.addBool = true"><img src="@/assets/img/icon/icon-add.png"/>添加</p>
            <i></i>
            <p @click="state.manageBool = true"><img src="@/assets/img/icon/icon-file.png"/>管理</p>
        </div>
    </div>
            <!-- 常用语添加弹出层 -->
    <van-popup v-model:show="state.addBool" duration="0" position="top" :style="{ width: '100%',height: '100%' }">
          <TalkWordsAdd></TalkWordsAdd>
    </van-popup>
            <!-- 常用语管理弹出层 -->
    <van-popup v-model:show="state.manageBool" duration="0" position="top" :style="{ width: '100%',height: '100%' }">
          <TalkWordsManage></TalkWordsManage>
    </van-popup>
</template>
<style scoped>
dl{
    height: 8.7rem;
    margin: 0 0.85rem;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    /* 内容超出高度时为其设置滚动条 */
    overflow: auto;
  }
  dl dt{
    font-size: 0.75rem;
    font-weight: 300;
    color: #030303;
    line-height: 1.12rem;
    padding: 1rem 0.21rem;
    border-bottom: 1px solid #eeeeee;
    text-align: left;
  }
  dl dt:last-child{
    border-bottom: 0;
  }
  .talk-word{
    height: 12rem;
  }
  .talk-word-btn{
    display: flex;
    margin-top: 1rem;
  }
  .talk-word-btn p{
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 300;
    color: #030303;
  }
  .talk-word-btn p img{
    width: 0.91rem;
    height: 0.91rem;
    margin-right: 0.29rem;
  }
  .talk-word-btn i{
    width: 0.03rem;
    height: 0.85rem;
    background: #EFEFEF;
    display: inline-block;
  }
</style>