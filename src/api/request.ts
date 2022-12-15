import axios from "axios";

// 创建axios实例
const service=axios.create({
    baseURL:"https://i5101b0918.oicp.vip/",
    timeout:15000,
    headers:{
        "Content-Type":"multipart/form-data"
    }
})

// 请求拦截
service.interceptors.request.use((config)=>{
    config.headers=config.headers || {}
    if(localStorage.getItem('token')){
        config.headers.token=localStorage.getItem('token') || ""
    }
    return config
})

// 响应拦截
service.interceptors.response.use((res)=>{
    const code:number=res.data.code
    if(code!=200){
        return Promise.reject(res.data)
       
    }
    else{
        console.log("成功");
        return res.data;
    }

},(err)=>{
    console.log("错误");
    
    console.log(err);
})
export default service


