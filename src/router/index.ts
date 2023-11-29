import {createRouter,createWebHashHistory,RouteRecordRaw} from "vue-router"
import {userStore} from '@/store/user'
const routes: Array<RouteRecordRaw> = [
        {
                path: '/login',
                component: () => import('@/views/login/index.vue')
        },
        {
                path: '/login/serviceAgree',
                component: () => import('@/views/login/serviceAgree.vue')
        },
        {
                path: '/login/privacyPolicy',
                component: () => import('@/views/login/privacyPolicy.vue')
        },
        {
                path: '/task',
                component: () => import('@/views/task/index.vue')
        },
        {
                path: '/task/search',
                component: () => import('@/views/task/search.vue')
        },
        {
                path: '/task/details/:id',
                component: () => import('@/views/task/details.vue')
        },
        {
                path: '/task/companySource/:id',
                component: () => import('@/views/task/companySource.vue')
        },
        {
                path: '/contract',
                component: () => import('@/views/contract/index.vue')
        },
        {
                path: '/contract/details/:id',
                component: () => import('@/views/contract/details.vue')
        },
        {
                path: '/contract/progress/:id',
                component: () => import('@/views/contract/progress.vue')
        },
        {
                path: '/message',
                component: () => import('@/views/message/index.vue')
        },
        {
                path: '/message/systemList',
                component: () => import('@/views/message/systemList.vue')
        },
        {
                path: '/message/systemDetails/:id',
                component: () => import('@/views/message/systemDetails.vue')
        },
        {
                path: '/message/talk/:taskId/:userId',
                component: () => import('@/views/message/talk.vue')
        },
        {
                path: '/message/talent/:resumeId/:userId',
                component: () => import('@/views/message/talent.vue')
        },
        {
                path: '/message/talk',
                component: () => import('@/views/message/talk.vue')
        },
        {
                path: '/my',
                component: () => import('@/views/my/index.vue')
        },
        {
                path: '/my/user',
                component: () => import('@/views/my/user/index.vue')
        },
        {
                path: '/my/user/authReal',
                component: () => import('@/views/my/user/authReal.vue')
        },
        {
                path: '/my/user/certified',
                component: () => import('@/views/my/user/certified.vue')
        },
        {
                path: '/my/company/authReal',
                component: () => import('@/views/my/company/authReal.vue')
        },
        {
                path: '/my/company/certified',
                component: () => import('@/views/my/company/certified.vue')
        },
        {
                path: '/my/user/identitySwitch',
                component: () => import('@/views/my/user/identitySwitch.vue')
        },
        {
                path: '/my/set',
                component: () => import('@/views/my/set/index.vue')
        },
        {
                path: '/my/feedback',
                component: () => import('@/views/my/feedback/index.vue')
        },
        {
                path: '/my/account',
                component: () => import('@/views/my/account/index.vue')
        },
        {
                path: '/my/account/advance',
                component: () => import('@/views/my/account/advance.vue')
        },
        {
                path: '/my/account/coinExplain',
                component: () => import('@/views/my/account/coinExplain.vue')
        },
        {
                path: '/my/account/depositExplain',
                component: () => import('@/views/my/account/depositExplain.vue')
        },
        {
                path: '/my/resume',
                component: () => import('@/views/my/resume/index.vue')
        },
        {
                path: '/my/resume/preview',
                component: () => import('@/views/my/resume/preview.vue')
        },
        {
                path: '/my/contract/:id',
                component: () => import('@/views/my/contract/index.vue')
        },
        {
                path: '/my/contract/add',
                component: () => import('@/views/my/contract/add.vue')
        },
        {
                path: '/my/collect',
                component: () => import('@/views/my/collect/index.vue')
        },
        {
                path: '/my/collect/talent',
                component: () => import('@/views/my/collect/talent.vue')
        },
        {
                path: '/my/about',
                component: () => import('@/views/my/about/index.vue')
        },
        {
                path: '/my/partner/person',
                component: () => import('@/views/my/partner/person.vue')
        },
        {
                path: '/my/partner/company',
                component: () => import('@/views/my/partner/company.vue')
        },
        {
                path: '/my/partner/admin',
                component: () => import('@/views/my/partner/admin.vue')
        },
        {
                path: '/my/task',
                component: () => import('@/views/my/task/index.vue')
        },
        {
                path: '/my/task/add',
                component: () => import('@/views/my/task/add.vue')
        },
        {
                path: '/my/task/details/:id',
                component: () => import('@/views/my/task/details.vue')
        },
        {
                path: '/my/coupon',
                component: () => import('@/views/my/coupon/index.vue')
        },
        {
                path: '/my/coupon/rule',
                component: () => import('@/views/my/coupon/rule.vue')
        },
        {
                path: '/talent',
                component: () => import('@/views/talent/index.vue')
        },
        {
                path: '/talent/search',
                component: () => import('@/views/talent/search.vue')
        },
        {
                path: '/talent/details/:id',
                component: () => import('@/views/talent/details.vue')
        },
        // 管理端
        {
                path: '/admin/home',
                component: () => import('@/views/admin/home/index.vue')
        },
        {
                path: '/admin/home/contract',
                component: () => import('@/views/admin/home/contract/index.vue')
        },
        {
                path: '/admin/home/pay',
                component: () => import('@/views/admin/home/pay/index.vue')
        },
        {
                path: '/admin/home/auditor',
                component: () => import('@/views/admin/home/auditor/index.vue')
        },
        {
                path: '/admin/home/auditor',
                component: () => import('@/views/admin/home/auditor/index.vue')
        },
        {
                path: '/admin/home/auditor/task/:id',
                component: () => import('@/views/admin/home/auditor/taskDetail.vue')
        },
        {
                path: '/admin/home/auditor/talent/:id',
                component: () => import('@/views/admin/home/auditor/talentDetail.vue')
        },
        {
                path: '/admin/home/auditor/company/:id',
                component: () => import('@/views/admin/home/auditor/companyDetail.vue')
        },
        {
                path: '/admin/home/user',
                component: () => import('@/views/admin/home/user/index.vue')
        },
        
]
const router = createRouter({
        history: createWebHashHistory(),
        routes
})
// 路由守卫逻辑
router.beforeEach((to,from,next)=>{
        console.log(from)
        const store = userStore()
        // 验证token存在可以进入页面
        if(store.token){
                next()
        }else{
                if(to.path==='/login' || to.path==='/login/serviceAgree' || to.path==='/login/privacyPolicy')
                        next()
                else 
                        next('/login')
        }
})
export default router