<script setup lang="ts">
    import {reactive} from 'vue'
    const props:any = defineProps({
        tabs: {
            type: Array<any>
        }
    })
    const state = reactive({
        type: props.tabs[0].type
    })
    const emit = defineEmits(['tabsCall'])
    const setTabList = (type:any) => {
        state.type = type
        emit('tabsCall', type)
     }
</script>
<template>
    <div class="contract-tab">
        <span v-for="(item,index) in tabs" :class="Number(state.type) === item.type?'active':''" :key="index" @click="setTabList(item.type)">{{item.text}}<i></i></span>
    </div>
</template>
<style scoped>

  .contract-tab{
    display: flex;
    background: #ffffff;
    margin-bottom: 0.77rem;
  }
  .contract-tab span{
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 400;
    color: #666666;
    flex: 1;
    align-items: center;
    border-bottom: 1px solid #EEEEEE;
    padding: 0.59rem 0;
    text-align: center;
    position: relative;
  }
  .contract-tab span.active{
    color: #FF9415;
  }
  .contract-tab span.active i{
    width: 1.63rem;
    height: 0.05rem;
    background: #FF9415;
    position: absolute;
    bottom: 0px;
    left: 50%;
    margin-left: -0.815rem;
  }
</style>