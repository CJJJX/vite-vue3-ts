import  request  from "../utils/request"
//合约管理
    //合约列表
    export function adminContractList(data:any){
        return request({
            url: '/admin/home/contract/list',
            method: 'get',
            params:data
        })
    }
    //合约是否完成
    export function adminContractConfirm(data:any){
        return request({
            url: '/admin/home/contract/pay/confirm',
            method: 'post',
            data
        })
    }
//审核管理
    //企业列表
    export function adminAuditorCompanyList(data: any) {
        return request({
            url: '/admin/home/auditor/company/list',
            method: 'get',
            params: data
        })
    }
    //企业审核详情
    export function adminAuditorCompanyDetail(data:any){
    return request({
        url: '/admin/home/auditor/company/detail',
        method: 'get',
        params: data
    })
}
    //企业审核操作
    export function adminAuditorCompanyEdit(data:any){
        return request({
            url: '/admin/home/auditor/company/edit',
            method: 'post',
            data
        })
}
    //人才列表
    export function adminAuditorTalentList(data: any) {
        return request({
            url: '/admin/home/auditor/talent/list',
            method: 'get',
            params: data
        })
    }
    //人才审核详情
    export function adminAuditorTalentDetail(data:any){
        return request({
            url: '/admin/home/auditor/talent/detail',
            method: 'get',
            params: data
        })
    }
    //人才审核操作
    export function adminAuditorTalentEdit(data:any){
        return request({
            url: '/admin/home/auditor/talent/edit',
            method: 'post',
            data
        })
}
    //任务列表
    export function adminAuditorTaskList(data: any) {
        return request({
            url: '/admin/home/auditor/task/list',
            method: 'get',
            params: data
        })
    }
    //任务审核详情
    export function adminAuditorTaskDetail(data:any){
    return request({
        url: '/admin/home/auditor/task/detail',
        method: 'get',
        params: data
    })
}
    //任务审核操作
    export function adminAuditorTaskEdit(data:any){
        return request({
            url: '/admin/home/auditor/task/edit',
            method: 'post',
            data
        })
}
//发薪管理
    // 发放薪资
    export function adminPayConfirm(data:any){
        return request({
            url: '/admin/home/pay/confirm',
            method: 'post',
            data
        })
    }
//用户管理
    // 用户管理列表
    export function adminUserUserList(data:any){
        return request({
            url: '/admin/home/user/user/list',
            method: 'get',
            params:data
        })
    }
    // 用户管理禁用和恢复
    export function adminUserUserConfirm(data:any){
        return request({
            url: '/admin/home/user/user/confirm',
            method: 'post',
            data
        })
    }
    // 企业管理列表
    export function adminUserCompanyList(data:any){
        return request({
            url: '/admin/home/user/company/list',
            method: 'get',
            params:data
        })
    }
    // 企业管理禁用和恢复
    export function adminUserCompanyConfirm(data:any){
        return request({
            url: '/admin/home/user/company/confirm',
            method: 'post',
            data
        })
    }
// 首页图表接口
export function adminHomeChart(data:any){
    return request({
        url: '/admin/home/chart',
        method: 'get',
        params:data
    })
}