import axios from 'axios';

let API_BASE_ADDRESS = 'http://localhost:8080/';
// if(process.env.NODE_ENV == "development"){
//     API_BASE_ADDRESS = ""
// }


let axiosInstance = axios.create({
    baseURL: API_BASE_ADDRESS,
    timeout: 20000,
  });
  
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    }, async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && originalRequest.url === "refresh") {
        return Promise.reject(error);
      }
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.refreshToken;
        const user = JSON.parse(localStorage.user);
        
        return await axiosInstance
          .post(
            "refresh",
            {
              refreshToken: refreshToken,
              username: user.username,
            },
            { headers: {} }
          )
          .then((resp) => {
            if (resp.status === 200) {
  
              localStorage.clear();
              localStorage.setItem("token","Bearer " + resp.data.token)
            localStorage.setItem("user", JSON.stringify(resp.data.user))
            localStorage.setItem("expiration", resp.data.expiration)
            localStorage.setItem("refreshToken", resp.data.refreshToken);
            
              originalRequest.headers["Authorization"] =  localStorage.token;
              axiosInstance.defaults.headers.common["Authorization"] =  localStorage.token;
              return axiosInstance(originalRequest);
            }
          });
      }
      return Promise.reject(error);
    }
  );

   
   export async function login(endpoint, payload){

    const uri = endpoint;
    
    return axiosInstance.post(uri,payload)
    .then(resp => {
        console.log(resp)

        if(resp.status === 200){
            localStorage.setItem("token","Bearer " + resp.data.token)
            localStorage.setItem("user", JSON.stringify(resp.data.user))
            localStorage.setItem("expiration", resp.data.expiration)
            localStorage.setItem("refreshToken", resp.data.refreshToken);
            axiosInstance.defaults.headers.common["Authorization"] =  localStorage.token;
            return {"message" : "success"}
        }
   })
   .catch(
    e =>{

        if(e.response){

            if(e.response.status === 400){
                return {"message" : "error"}
            }else if(e.response.status === 401){
                return {"message" : "unauthorized"}
            }

        }else{
            if (e.code === 'ECONNABORTED'){
                return {"message" : "timeout"}
            }

            return {"message" : "no connection"}
        }    
    }
)
}

export async function refresh(endpoint){

    const uri = endpoint;
    
    return axiosInstance.get(uri)
    .then(resp => {
        
        if(resp.status === 200){
            localStorage.setItem("token","Bearer " + resp.data.token)
            return {"message" : "success"}
        }
   })
   .catch(
    e =>{

        if(e.response){

            if(e.response.status === 400){
                return {"message" : "error"}
            }else if(e.response.status === 401){
                return {"message" : "unauthorized"}
            }

        }else{
            if (e.code === 'ECONNABORTED'){
                return {"message" : "timeout"}
            }

            return {"message" : "no connection"}
        }    
    }
)
}


   export async function getRequest(endpoint){

    const uri = endpoint;
    
    return axiosInstance.get(uri)
    .then(resp => {
        if(resp.status === 200){
            return resp.data
        }

    })

    .catch(
        e =>{
            console.log(e)

            if(e.response){
    
                if(e.response.status === 400){
                    return {"message" : "error"}
                }else if(e.response.status === 401){
                    return {"message" : "unauthorized"}
                }
    
            }else{
                if (e.code === 'ECONNABORTED'){
                    return {"message" : "timeout"}
                }
                return {"message" : "no connection"}
            }
        }
    )
    

   }

   export async function postRequest(endpoint, payload){

    const uri = endpoint;
    
    return axiosInstance.post(uri,payload)
    .then(resp => {
        if(resp.status === 200){
            return resp.data
        }
   })
   .catch(
    e =>{
        console.log(e)

        if(e.response){

            if(e.response.status === 400){
                return {"message" : "error"}
            }else if(e.response.status === 401){
                return {"message" : "unauthorized"}
            }

        }else{
            if (e.code === 'ECONNABORTED'){
                return {"message" : "timeout"}
            }
            return {"message" : "no connection"}
        }
    }
)
}

   export async function putRequest(endpoint, payload){

    const uri = endpoint;
    
    return axiosInstance.put(uri,payload)
    .then(resp => {

        if(resp.status === 200){
            return resp.data
        }
   })
   .catch(
    e =>{
        console.log(e)

        if(e.response){

            if(e.response.status === 400){
                return {"message" : "error"}
            }else if(e.response.status === 401){
                return {"message" : "unauthorized"}
            }

        }else{
            if (e.code === 'ECONNABORTED'){
                return {"message" : "timeout"}
            }
            return {"message" : "no connection"}
        }
    }
)
       
   }

   export async function deleteRequest(endpoint, payload){

    const uri = endpoint;
    
    return axiosInstance.delete(uri, {data : payload})
    .then(resp => {

        if(resp.status === 200){
            return resp.data
        }

   })
   .catch(
    e =>{
        console.log(e)

        if(e.response){

            if(e.response.status === 400){
                return {"message" : "error"}
            }else if(e.response.status === 401){
                return {"message" : "unauthorized"}
            }

        }else{
            if (e.code === 'ECONNABORTED'){
                return {"message" : "timeout"}
            }
            return {"message" : "no connection"}
        }
    }
)

   }

   export async function reportDownloadRequest(endpoint, option1, option2){
    
    const uri = endpoint+"/" + option1 +"/" + option2 +"/null";

    return axiosInstance(uri, {
        method: 'GET',
        responseType: "blob",
        timeout : 100000,
        
    })
    .then(response => {

            return {"message" : "success", "data":response.data}


    })
   .catch(
    e =>{
        console.log(e)

        if(e.response){

            if(e.response.status === 400){
                return {"message" : "error"}
            }else if(e.response.status === 401){
                return {"message" : "unauthorized"}
            }

        }else{
            if (e.code === 'ECONNABORTED'){
                return {"message" : "timeout"}
            }
            return {"message" : "no connection"}
        }
    }
)
   }
   export async function reportEmailRequest(endpoint, option1, option2,option3){
    
    const uri = endpoint+"/" + option1 +"/" + option2 +"/" + option3;

    return axiosInstance(uri, {
        method: 'GET',
        timeout : 100000,
        
    })
    .then(response => {

            return {"message" : "success", "data":response.data}


    })
   .catch(
    e =>{
        console.log(e)

        if(e.response){

            if(e.response.status === 400){
                return {"message" : "error"}
            }else if(e.response.status === 401){
                return {"message" : "unauthorized"}
            }

        }else{
            if (e.code === 'ECONNABORTED'){
                return {"message" : "timeout"}
            }
            return {"message" : "no connection"}
        }
    }
)
   }

