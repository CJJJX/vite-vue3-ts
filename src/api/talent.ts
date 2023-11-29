import request from '../utils/request'
// 人才列表接口
export function getTalent(data:any){
    return request({
        url: '/job/resume/list',
        method: 'get',
        params: data
    })
}
// 人才详情接口
export function getTalentDetail(data:any){
    return request({
        url: '/admin/resume/getinfoDetailsAPI',
        method: 'get',
        params: data
    })
}
// 收藏添加简历接口
export function addResumeCollect(data:any){
    return request({
        url: '/collect/resume/add',
        method: 'post',
        data
    })
}
// 删除简历接口
export function deleteResumeCollect(data:any){
    return request({
        url: '/collect/resume/delete',
        method: 'delete',
        params: data
    })
}
// 筛选配置接口
export function getScreenl(){
    return request({
        url: '/conllect/recuit/getScreenl',
        method: 'get',
        params: {}
    })
}
// 城市列表接口
// 职位类型接口
// Banner接口
// 热门搜索接口