<script setup lang="ts">
import {provide} from 'vue'
import * as echarts from 'echarts'
provide('echarts',echarts)
</script>

<template>
  <router-view />
</template>

<style scoped>

</style>
