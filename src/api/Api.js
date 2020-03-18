import axios from 'axios';

let API_BASE_ADDRESS = 'http://localhost:8080';
// if(process.env.NODE_ENV == "development"){
//     API_BASE_ADDRESS = ""
// }

export default class Api {
   
   static async login(endpoint, payload){

    const uri = API_BASE_ADDRESS + "/" + endpoint;
    
    return axios.post(uri,payload, {timeout : 2})
    .then(resp => {

        if(resp.status === 200){
            localStorage.setItem("token","Bearer " + resp.data.token)
            localStorage.setItem("user", resp.data.user)
            return {"message" : "success"}
        }
   })
   .catch(
    e =>{
        console.log(e)

        if(e.response.status === 500){
            return {"message" : "no connection"}
        }else if(e.response.status === 400){
            return {"message" : "400"}
        }else if(e.response.status === 401){
            return {"message" : "unauthorized"}
        }
        
        //return Promise.reject(e)
    }
)
}


   static async getRequest(endpoint){

    const uri = API_BASE_ADDRESS + "/" + endpoint;
    console.log("IN GET")
    
    return axios.get(uri, {headers : {"Authorization" : localStorage.getItem("token")}})
    .then(resp => {
        console.log(resp)
        if(resp.status === 200){
            return resp.data
        }else if (resp.status === 500){

            console.log( resp.status)
            return {'message' : ""}
        }else if(resp.status === 400){
            console.log(resp.status)
            return {'message' : ""}
        }

    })

    .catch(
        e =>{
            console.log(e)
            return {"message" : "no connection"}
            //return Promise.reject(e)
        }
    )
    

   }

   static async postRequest(endpoint, payload){

    const uri = API_BASE_ADDRESS + "/" + endpoint;
    
    return axios.post(uri,payload, {headers : {"Authorization" : localStorage.token }})
    .then(resp => {
        console.log(resp)
        if(resp.status === 200){
            return resp.data
        }
   })
   .catch(
    e =>{
        console.log(e)

        if(e.response.status === 500){
            return {"message" : "no connection"}
        }else if(e.response.status === 400){
            return {"message" : "400"}
        }else if(e.response.status === 401){
            return {"message" : "unauthorized"}
        }
        
        //return Promise.reject(e)
    }
)
}

   static async putRequest(endpoint, payload){

    const uri = API_BASE_ADDRESS + "/" + endpoint;
    
    return axios.put(uri,payload, {headers : {"Authorization" : localStorage.getItem("token")}})
    .then(resp => {

        if(resp.status === 200){
            return resp.data
        }else if (resp.status === 500){

            console.log( resp.status)
        }else if(resp.status === 400){
            console.log(resp.status)
        }
   })
   .catch(
    e =>{
        console.log(e)
        return {"message" : "no connection"}
        //return Promise.reject(e)
    }
)
       
   }

   static async deleteRequest(endpoint, payload){

    const uri = API_BASE_ADDRESS + "/" + endpoint;
    
    return axios.delete(uri,{data : payload}, {headers : {"Authorization" : localStorage.getItem("token")}})
    .then(resp => {

        if(resp.status === 200){
            return resp.data
        }else if (resp.status === 500){

            console.log( resp.status)
        }else if(resp.status === 400){
            console.log(resp.status)
        }

   })
   .catch(
    e =>{
        console.log(e)
        return {"message" : "no connection"}
        //return Promise.reject(e)
    }
)

   }

}