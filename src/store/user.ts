import {defineStore} from 'pinia'

export const userStore = defineStore({
    id: 'user',
    state: ()=>{
        return {
            token: localStorage.getItem('token') || '',
            role:  '3',//localStorage.getItem('role') ||
            userInfo:{}
         }
    },
    actions:{
        setRole(type:string){
            this.role = type          
        },
        setUserInfo(data:any){
            this.userInfo = data.user_info
            this.role = data.user_info.role || '1'
            this.token = data.token
            localStorage.setItem('token',this.token)
            localStorage.setItem('role',this.role)
        },
        logout(){
            this.token=''
            this.userInfo={}
            localStorage.removeItem('token')
            localStorage.removeItem('role')
        }
    }
   
})
