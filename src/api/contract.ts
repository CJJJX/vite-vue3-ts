import request from '../utils/request'
// 合约列表接口
export function contractList(data:any){
    return request({
        url: '/task/myContractAllList',
        method: 'get',
        params: data
    })
}
// 合约详情接口
export function contractDetail(data:any){
    return request({
        url: '/task/contractAllList',
        method: 'get',
        params: data
    })
}
// 合约签约接口
export function contractOperation(data:any){
    return request({
        url: '/contract/isContract',
        method: 'put',
        data
    })
}
// 合约新增接口
export function contractAdd(data:any){
    return request({
        url: '/task/addcontract',
        method: 'post',
        data
    })
}
// 合约进度评估接口
export function contractGradeEdit(data:any){
    return request({
        url: '/contract/grade/edit',
        method: 'put',
        data
    })
}