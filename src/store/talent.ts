import {defineStore} from 'pinia'
export const talentStore = defineStore({
    id: 'talent',
    state: ()=>{
        return{
            highestList:[],
            salaryList:[],
            experienceList:[],
            hotSearchList: []
        }
    },
    actions:{
        setScreen(data:any){
            this.highestList = data.highest
            this.salaryList = data.salary
            this.experienceList = data.experience
        },
        setHotSearchList(data:any){
            this.hotSearchList  = data
        },
    }
})