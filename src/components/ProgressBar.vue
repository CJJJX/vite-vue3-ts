<script setup lang="ts">
    const props:any = defineProps({
        item: {
            type: Object
        }
    })
    const contractState = (index:number) => {
        if(index === 1) return 'green'
        if(index === 2) return 'orange'
        if(index === 3) return 'red'
        return ''
    }

</script>
<template>
  <div class="contract-progress">
        <i :class="contractState(props.item.contract_I_state)"></i>
        <i :class="contractState(props.item.contract_II_state)"></i>
        <i :class="contractState(props.item.contract_III_state)"></i>
        <i :class="contractState(props.item.contract_IIII_state)"></i>
    </div>
</template>
<style>
.contract-progress{
    display: flex;
    height: 0.53rem;
    width: 100%;
}
.contract-progress i{
    flex: 1;
    background: #f3f3f3;
    margin: 0 1px;
}
.contract-progress i.green{
    background: #50D400;
}
.contract-progress i.orange{
    background: #FE9215;
}
.contract-progress i.red{
    background: #FF4800;
}
</style>