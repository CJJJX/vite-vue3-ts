<script setup lang="ts">
    import FooterTabbar from '@/components/FooterTabbar.vue';
    import MessageList from '@/components/list/MessageList.vue'
    import {messageStore} from '@/store/message' 
    import {userStore} from '@/store/user' 

    const store = messageStore()
    const ustore:any = userStore()
    store.getSystemMessageList()
    store.getChatMessageList()
</script>
<template>
    <MessageList :messageList="store.systemNewMessage" type="system"></MessageList>
    <MessageList :messageList="store.messageList" :type="ustore.role==1? 'talk' : 'talent'"></MessageList>
    <FooterTabbar></FooterTabbar>
</template>
<style scoped>
</style>