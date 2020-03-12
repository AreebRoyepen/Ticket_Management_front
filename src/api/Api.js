import axios from 'axios';

let API_BASE_ADDRESS = 'http://192.168.0.103:8080';
// if(process.env.NODE_ENV == "development"){
//     API_BASE_ADDRESS = ""
// }

export default class Api {

   static login() {

        return (
            {
                "name": "admin",
                "surname": "admin",
                "email": "admin@gmail.com",
                "username": "admin",
                "role": {
                    "roleName": "admin",
                    "id": 1
                },
                "id": 1
            }
        )

   }

   static events(){
    return (
        [
            {
                "name": "Food Fair April 2018 mmmmmmmmmmmmmmmmmmmmm mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm mmmmmmmmmmmmmmmmmmmmmm",
                "active": false,
                "ticketPrice": 100,
                "id": 1,
                "from": 1,
                "to": 1000
            },
            {
                "name": "Food Fair June 2018",
                "active": false,
                "ticketPrice": 100,
                "id": 2,
                "from": 1,
                "to": 1000
            },
            {
                "name": "Food Fair Dec 2018",
                "active": true,
                "ticketPrice": 100,
                "id": 3,
                "from": 1,
                "to": 1000
            }
        ]
    )
   }

   static availableEvents(){
    return (
        [
            {
                "name": "Food Fair Dec 2018",
                "active": true,
                "ticketPrice": 100,
                "id": 3,
                "from": 1,
                "to": 1000
            }
        ]
    )
   }

   static unavailableEvents(){
       return (
        [
            {
                "name": "Food Fair Dec 2018",
                "active": true,
                "ticketPrice": 100,
                "id": 3,
                "from": 1,
                "to": 1000
            }
        ]
       )
   }

   static addEvent(){
       return (
        {
            "name" : "Food Fair Dec 2018",
            "from": "1",
            "to" : "1000",
            "active": "true",
            "ticketPrice" : 100
        }
       )
   }

   static eventById(){
       return (
        {
            "name" : "Food Fair Dec 2018",
            "from": "1",
            "to" : "1000",
            "active": "true",
            "ticketPrice" : 100
        }
       )
   }

   static eventByName(){
       return (
        [
            {
                "name": "Food Fair April 2018",
                "active": false,
                "ticketPrice": 100,
                "id": 1,
                "from": 1,
                "to": 1000
            }
        ]
       )
   }

   static eventLikeName(){

    return (
        [
            {
                "name": "Food Fair April 2018",
                "active": false,
                "ticketPrice": 100,
                "id": 1,
                "from": 1,
                "to": 1000
            },
            {
                "name": "Food Fair June 2018",
                "active": false,
                "ticketPrice": 100,
                "id": 2,
                "from": 1,
                "to": 1000
            },
            {
                "name": "Food Fair Dec 2018",
                "active": true,
                "ticketPrice": 100,
                "id": 3,
                "from": 1,
                "to": 1000
            }
        ]
    )
   }

   static deleteEvent(){
       return (

        {
            "message":"Successfully Deleted"

        }
       )
   }

   static allocateTicket(){
       return(
        {
            "ticketNumber": 2,
            "paid": false,
            "person": {
                "name": "Areeb",
                "surname": "Royepen",
                "number": "0724431348",
                "email": "a@gmail.com",
                "id": 1
            },
            "event": {
                "name": "Food Fair June 2018",
                "active": false,
                "ticketPrice": 100,
                "id": 2,
                "from": 1,
                "to": 1000
            },
            "id": 6
        }
       )
   }

   static returnTicket(){
       return (
           {
               "message":"Successfully Deleted"
           }
       )
   }

   static tickets(){
       return (
        [
            {
                "ticketNumber": 1,
                "paid": false,
                "person": {
                    "name": "Areeb",
                    "surname": "Royepen",
                    "number": "0724431348",
                    "email": "a@gmail.com",
                    "id": 1
                },
                "event": {
                    "name": "Food Fair June 2018",
                    "active": false,
                    "ticketPrice": 100,
                    "id": 2,
                    "from": 1,
                    "to": 1000
                },
                "id": 5
            },
            {
                "ticketNumber": 2,
                "paid": false,
                "person": {
                    "name": "Areeb",
                    "surname": "Royepen",
                    "number": "0724431348",
                    "email": "a@gmail.com",
                    "id": 1
                },
                "event": {
                    "name": "Food Fair June 2018",
                    "active": false,
                    "ticketPrice": 100,
                    "id": 2,
                    "from": 1,
                    "to": 1000
                },
                "id": 6
            }
        ]
       )
   }

   static payment(){
       return (
        {
            "ticketNumber": 1,
            "paid": false,
            "person": {
                "name": "Areeb",
                "surname": "Royepen",
                "number": "0724431348",
                "email": "a@gmail.com",
                "id": 1
            },
            "event": {
                "name": "Food Fair June 2018",
                "active": false,
                "ticketPrice": 100,
                "id": 2,
                "from": 1,
                "to": 1000
            },
            "id": 5
        }
       )
   }

   static person(){
       return (
        [
            {
                "name": "Areeb",
                "surname": "Royepen",
                "number": "0724431348",
                "email": "a@gmail.com",
                "id": 1
            },
            {
                "name": "Rutendo",
                "surname": "Nyakutira",
                "number": "0724431348",
                "email": "rny@gmail.com",
                "id": 2
            },
            {
                "name": "Rutendo",
                "surname": "Nyakutira",
                "number": "0724431348",
                "email": "rny@gmail.com",
                "id": 3
            }
        ]
       )
   }

   static addPerson(){
       return (
        {
            "name": "Shab",
            "surname": "A",
            "number": "0724431348",
            "email": "Shab@gmail.com",
            "id": 4
        }
       )
   }

   static personByName(){
       return (
        [
            {
                "name": "Areeb",
                "surname": "Royepen",
                "number": "0724431348",
                "email": "a@gmail.com",
                "id": 1
            }
        ]
       )
   }

   static personByID(){
       return(
        {
            "name": "Areeb",
            "surname": "Royepen",
            "number": "0724431348",
            "email": "a@gmail.com",
            "id": 1
        }
       )
   }

   static deletePerson(){
       return(
           {
               "message": "Succesfully Deleted"
           }
       )
   }


   static async getRequest(endpoint){

    const uri = API_BASE_ADDRESS + "/" + endpoint;
    
    return axios.get(uri)
    // .then((response) => {
    //     console.log(response);
    //   }, (error) => {
    //     console.log(error);
    //   });


    .then(resp => {
        if(resp.status == 200){
            return resp.data
        }else if (resp.data == 500){

            console.log( "SERVER TIME OUT")
        }


    })

   }

   static async postRequest(endpoint, payload){

    const uri = API_BASE_ADDRESS + "/" + endpoint;
    
    return axios.post(uri,payload)
    // .then((response) => {
    //     console.log(response);
    //   }, (error) => {
    //     console.log(error);
    //   });


    .then(resp => {

        if(resp.status == 200){
            return resp.data
        }else if (resp.data == 500){
            console.log( "SERVER TIME OUT")

        }


    // }).catch(resp =>{

    //         console.log(resp)

    //     }
    // )
   })
}

   static putRequest(endpoint, payload){
       
   }

   static deleteRequest(endpoint, payload){

   }

}