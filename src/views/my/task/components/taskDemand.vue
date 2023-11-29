<script setup lang="ts">
  import {inject,reactive} from 'vue'
  const {closeDemand} = inject('popup') as any
  const state = reactive({
    value: ''
  })
</script>
<template>
    <van-nav-bar title="任务要求" left-arrow @click-left="closeDemand('')"/>
    <van-field
        v-model="state.value"
        rows="12"
        autosize
        label=""
        type="textarea"
        maxlength="500"
        placeholder="请输入您的任务要求"
        show-word-limit
    />
    <button class="wy-submit" @click="closeDemand(state.value)">保存</button>
</template>