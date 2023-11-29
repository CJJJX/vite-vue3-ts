import request from '../utils/request'
// 系统消息列表接口
export function systemList(data:any){
    return request({
        url:'/user/inform/list',
        method: 'get',
        params: data
    })
}
// 系统消息详情接口
export function systemDetail(data:any){
    return request({
        url: '/user/inform/lookover',
        method: 'get',
        params: data
    })
}
// 对话消息列表接口
export function chatMessageList(data:any){
    return request({
        url: '/it_chat/my/message/list',
        method: 'get',
        params: data
    })
}
// 对话消息聊天内容接口
export function chatMessageContent(data:any){
    return request({
        url: '/it_chat/message/list',
        method: 'get',
        params: data
    })
}
// 对话消息聊天发送接口
export function chatMessageContentAdd(data:any){
    return request({
        url: '/it_chat/add_message',
        method: 'post',
        data
    })
}
// 对话消息常用语列表接口
export function chatMessageWordsList(){
    return request({
        url: '/it_chat/message/works/list',
        method: 'get'
    })
}
// 对话消息常用语添加接口
export function chatMessageWordsAdd(data:any){
    return request({
        url: '/it_chat/message/works/add',
        method: 'post',
        data
    })
}
// 对话消息常用语修改接口
export function chatMessageWordsEdit(data:any){
    return request({
        url: '/it_chat/message/works/edit',
        method: 'post',
        data
    })
}
// 对话消息常用语删除接口
export function chatMessageWordsDelete(data:any){
    return request({
        url: '/it_chat/message/works/delete',
        method: 'post',
        data
    })
}