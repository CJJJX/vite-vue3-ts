import axios from 'axios'
import {showToast} from 'vant'
let baseURL =  '/api'
const service = axios.create({
    baseURL,
    timeout: 10000
})
// 添加请求拦截器
service.interceptors.request.use(
    // 在发送请求之前做些什么
    (config:any) => {
        const token = window.localStorage.getItem('token')
        if(token){
            config.headers = {
                'x-access-token': token
            }
        }
        return config
    },
    // 对请求错误做些什么
    error => Promise.reject(error)
)
// 添加响应拦截器 注意！！！！z之前这里service写成了axios，其他代码逻辑都对，导致返回的一直只能是原始的response而不是想要返回的res.result
service.interceptors.response.use(
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    response => {
        // console.log(1)
        const res = response.data
        if(response.status !== 200){
            return Promise.reject(new Error(res.success || 'Error'))
        }
        else{
            if(res.code == 200){
                return res.result || res.data
            }
            else{
                showToast(res.success)
            }
        }
    }
    ,error => Promise.reject(error)
    // 对响应错误做点什么
  );
  export default service