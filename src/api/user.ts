import request from "../utils/request"
// 获取验证码
export function getCode(data:any) {
    return request({
        url: '/login/code',
        method: 'post',
        data
    })
}
// 登录接口
export function login(data:any){
    return request({
        url: '/login',
        method: 'post',
        data
    })
}
// 协议文件接口
export function getPolicy(data:any){
    const res = request({
        url: '/policy_protocol/list',
        method: 'get',
        params: data
    })
    return res
}