import {defineStore} from 'pinia'
import { cityList } from '@/api/task'
export const taskStore = defineStore({
    id: 'task',
    state: ()=>{
        return{
            cityValue: localStorage.getItem('city') || '北京',
            cityList:[],
            areaList:[],
            bannerList:[],
            positionList:[],
            screenList: {},
            hotSearchList: []
        }
    },
    actions:{
        setCityValue(value:string){
            this.cityValue = value
        },
        setCityList(data:any){
            this.cityList  = data
        },
        setBannerList(data:any){
            this.bannerList  = data
        },
        setPositionList(data:any){
            this.positionList  = data
        },
        setScreenList(data:any){
            this.screenList  = data
        },
        setHotSearchList(data:any){
            this.hotSearchList  = data
        },
        async getCityList(){
            const res:any = await cityList()
            if(res){
                this.cityList = res
                let city :any = []
                for(let i = 0; i<res.length;i++){
                    city.push({
                        text: res[i]. name,
                        children: []
                    })
                    if(res[i].children && res[i].children.length){
                        for(let j=0;j<res[i].children.length;j++){
                            city[i].children.push({
                                text: res[i].children[j].name
                            })
                        }
                    }
                }
                this.areaList = city
            }
            console.log(this.areaList)
        }
    }
})