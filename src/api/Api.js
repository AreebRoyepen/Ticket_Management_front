import axios from 'axios';

axios.defaults.timeout = 20000;

let API_BASE_ADDRESS = 'http://localhost:8080';
// if(process.env.NODE_ENV == "development"){
//     API_BASE_ADDRESS = ""
// }

export default class Api {
   
   static async login(endpoint, payload){

    const uri = API_BASE_ADDRESS + "/" + endpoint;
    
    return axios.post(uri,payload)
    .then(resp => {
        console.log(resp)

        if(resp.status === 200){
            localStorage.setItem("token","Bearer " + resp.data.token)
            localStorage.setItem("user", JSON.stringify(resp.data.user))
            localStorage.setItem("expiration", resp.data.expiration)
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


   static async getRequest(endpoint){

    const uri = API_BASE_ADDRESS + "/" + endpoint;
    
    return axios.get(uri, {headers : {"Authorization" : localStorage.getItem("token")}})
    .then(resp => {
        console.log(resp)
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

   static async putRequest(endpoint, payload){

    const uri = API_BASE_ADDRESS + "/" + endpoint;
    
    return axios.put(uri,payload, {headers : {"Authorization" : localStorage.getItem("token")}})
    .then(resp => {
        console.log(resp)

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

   static async deleteRequest(endpoint, payload){

    const uri = API_BASE_ADDRESS + "/" + endpoint;
    
    return axios.delete(uri, {headers : {"Authorization" : localStorage.getItem("token")} ,data : payload})
    .then(resp => {
        console.log(resp)

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

   static async reportRequest(option){
    
    const uri = API_BASE_ADDRESS + "/" + "whoOwesWhat/" + option;

    axios(uri, {
        method: 'GET',
        responseType: "blob",
        headers : {"Authorization" : localStorage.getItem("token")}
    })
    .then(response => {
    //Create a Blob from the PDF Stream
    console.log(response)
        const file = new Blob(
          [response.data], 
          {type: 'application/pdf'});
    //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
        window.open(fileURL);
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

}