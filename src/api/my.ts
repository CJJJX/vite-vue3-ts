import request from '../utils/request'
// 我的基础信息
    // 我的个人信息接口
export function userInfo(){
    return request({
        url: '/clicent/user_info',
        method: 'get',
        params: {}
    })
}
    // 个人信息保存接口
export function userModify(data:any){
    return request({
        url: '/user/modify',
        method: 'put',
        data
    })
}
    // 我的收藏列表接口
export function collectList(){
    return request({
        url: '/task/getTaskCollection',
        method: 'get',
        params: {}
    })
}
    // 图片上传接口
export function uploadImage(data:any){
    return request({
        url: '/upload/image',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
    //企业端我的任务合约体验金数据接口
    export function myAllCount(){
        return request({
            url: '/my/all/count',
            method: 'get',
            params: {}
        })
    }    
    //企业端我的收藏列表接口
    export function talentCollectList(){
        return request({
            url: '/collect/resume/list',
            method: 'get',
            params: {
                type:1
            }
        })
    }
//账户管理
    //我的账户提现列表接口
export function transferList(){
    return request({
        url: '/my/transfer/userList',
        method: 'get',
        params: {}
    })
}
    //我的账户收益接口
export function incomeList(data:any){
    return request({
        url: '/admin/task/purchaseRecord',
        method: 'get',
        params: data
    })
}
    //我的账户提现接口
export function withDraw(data:any){
    return request({
        url: '/my/apply/transfer',
        method: 'post',
        data
    })
}
//简历管理
    //我的简历详情接口
export function resumeDetail(data:any){
    return request({
        url: '/admin/resume/getInfoDetailsAPI',
        method: 'get',
        params: {id:data.resume_id}
    })
}
    //我的简历个人优势保存接口
export function personAdvantage(data:any){
    return request({
        url: '/resume/advantage',
        method: 'post',
        data
    })
}    
    //简历求职意愿字典接口
export function resumeDict(){
    return request({
        url: '/conllect/recuit/getRecuit',
        method: 'get',
        params: {}
    })
}
    //我的简历求职意愿保存接口
export function jobIntention(data:any){
        return request({
            url: '/resume/job_intention',
            method: 'post',
            data
        })
}    
    //简历关键技能字典接口
export function labelsSkill(){
        return request({
            url: '/resume/labels_skill',
            method: 'get',
            params: {pid:4}
        })
}
    //修改技能关键词接口
export function resumeSkill(data:any){
    return request({
        url: '/resume/skill',
        method: 'post',
        data
    })
}   
    //修改工作经历
export function editWorkExper(data:any){
        return request({
            url: '/resume/work/edit',
            method: 'put',
            data
        })
}       
    //添加工作经历
export function addWorkExper(data:any){
        return request({
            url: '/admin/resume/work/add',
            method: 'post',
            data
        })
}         
    //删除工作经历
export function workDelete(data:any){
        return request({
            url: 'job/resume/work/delete',
            method: 'delete',
            params:data
        })
}       
    //修改项目经历
export function editProjectExper(data:any){
        return request({
            url: '/admin/resume/project/edit',
            method: 'put',
            data
        })
}     
    //添加项目经历 
export function addProjectExper(data:any){
        return request({
            url: '/admin/resume/project/add',
            method: 'post',
            data
        })
} 
    //删除项目经历 
export function projectDelete(data:any){
        return request({
            url: '/admin/resume/project/edit',
            method: 'delete',
            params:data
        })
} 
    //修改教育经历 
export function editEdu(data:any){
        return request({
            url: '/admin/resume/edu/edit',
            method: 'put',
            data
        })
} 
// 身份认证
    //实名认证保存接口
export function addAuthReal(data:any){
    return request({
        url: '/real/auth/user',
        method: 'post',
        data
    })
}
// 意见反馈
    //添加意见反馈接口
export function addFeedBack(data:any){
    return request({
        url: '/feedback/add',
        method: 'post',
        data
    })
}
// 身份切换
    //身份切换保存接口
    export function addRole(data:any){
        return request({
            url: 'user/identity/switch',
            method: 'post',
            data
        })
    }
    //身份切换人才申请接口
    export function addPartnerPerson(data:any){
        return request({
            url: '/settlein/itEnterprise/add',
            method: 'post',
            data
        })
    }
    //身份切换企业入驻申请接口
    export function addEnterprise(data:any){
        return request({
            url: '/settlein/enterprise/add',
            method: 'post',
            data
        })
    }
    //身份切换管理员入驻申请接口
    export function addManage(data:any){
        return request({
            url: '/settlein/manage/add',
            method: 'post',
            data
        })
    }
//体验金  
    //体验金领取添加接口
    export function addMyCoupon(data:any){
        return request({
            url: '/experience/addMyList',
            method: 'post',
            data
        })
    }
    //体验金列表接口
    export function couponList(){
        return request({
            url: '/experience/getList',
            method: 'get',
            params:{}
        })
    }
//企业认证
    //我的企业详情
    export function companyDetail(){
        return request({
            url: '/company/detail',
            method: 'get',
            params:{}
        })
    }    
    //我的企业认证
    export function companyCertification(data:any){
        return request({
            url: '/company/certification',
            method: 'put',
            data
        })
    }    