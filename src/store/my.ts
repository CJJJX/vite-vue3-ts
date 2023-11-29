import {defineStore} from 'pinia'
import {userInfo,resumeDetail,resumeDict,labelsSkill} from '../api/my'
export const myStore = defineStore({
    id: 'my',
    state: ()=>{
        return {
            userInfo:{},
            companyList:[],
            projectList:[],
            resumeInfo: {},
            experience: [],
            highestEducation: <any>[],
            jobsType: [],
            salaryScope:<any>[],
            sysSkillList: []
         }
    },
    actions:{
         async getUserInfo(){
            const res = await userInfo()
            if(res){
                this.userInfo = res
            }
         },
         async getResumeDetail(){
            if(Object.keys({}).length === 0) //!this.userInfo.resume_id
            await this.getUserInfo()
            const res = await resumeDetail(this.userInfo)
                if(res && res.data[0]){
                    this.companyList = res.data[0].companyList
                    this.projectList = res.data[0].projectList
                    this.resumeInfo = res.data[0].info[0]
                }
         },
         async getResumeDict(){
            const res = await resumeDict()
            if(res && res.data){
                this.experience = res.data.experience
                let edu = []
                for(let j = 0;j< res.data.highestEducation.length;j++){
                    edu.push({
                        name: res.data.highestEducation[j].value
                    })
                }
                this.highestEducation = edu
                console.log(this.highestEducation)
                this.jobsType = res.data.jobsType
                // this.salaryScope = res.data.salary_scope
                let arr = []
                let scope = res.data.salary_scope
                for(let i = 0;i< scope.length;i++){
                    arr.push({
                        name:scope[i]
                    })
                }
                this.salaryScope = arr
            }
         },
         async getLabelsSkill(){
            const res = await labelsSkill()
            if(res){
                this.sysSkillList = res.data
            }
         }
        }
})
