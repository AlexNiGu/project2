// import { useReducer } from "react"


export class Fetch {

    constructor() {

        this.paint = {}
        this.personalPaints = {}
        this.test = {}
        this.shopFornitures = {}

        this.user = JSON.parse(localStorage.getItem('user'))

    }

    async fetchGetPaiting(){

        // console.log('hola has entrado en painting')
        

        var cuerpo = {
            IdDibujo:this.user.Numdibujos
        }

        var options = {
            method:'post',
            body:JSON.stringify(cuerpo),
            headers:{"Content-Type":"application/json"}
        }


        await fetch('http://localhost:3000/painting-init',options)
        .then(res=>res.json())
        .then(response=>this.paint = response)
    }

    
    async fetchSavePainting(formData) {

        const options = {
            method: 'post',
            body: formData ,//cambair stringfy
            headers : {'Accept': 'multipart/form-data'},
        }
      
        await fetch('http://localhost:3000/save-painting',options).then(res=>res.json()).then(response=>console.log(response))

    }

    async fetchGetConversation(){

        

        var cuerpo = {
            IdTest:this.user.Numtest
        }
        var options = {
            method:'post',
            body:JSON.stringify(cuerpo),
            headers:{"Content-Type":"application/json"}
        }

        await fetch('http://localhost:3000/conversation-init',options)
        .then(res=>res.json())
        .then(response=>this.test = response)

    }

    async responseConversation(cuerpo){

        /**ESTE CUERPO TIENE QUE LLEGAR POR PARAMETRO PERO TE DEJO LA PLANTILLA DE COMO TIENE QUE QUEDAR PARA SER ENVIADO */
       

        var options = {
            method:'post',
            body:JSON.stringify(cuerpo),
            header:{"Content-Type":"application/json"}
        }

        await fetch('http://localhost:3000/conversation-register-data',options)
        .then(res=>res.json())
        .then(response=>console.log(response))
    }


    async getFurnitures(){
        await fetch('http://localhost:3000/rewards-shop')
          .then(res=>res.json())
          .then(response=>this.shopFornitures = response)
      }


    async getPersonalPaints(){


        const u = await JSON.parse(localStorage.getItem('user'))

        var cuerpo = {
            IdUser: u.IdUser
        }

        var options = {
            method:'post',
            body: JSON.stringify(cuerpo),
            headers: {"Content-Type":"application/json"}
        }

        await fetch('http://localhost:3000/get-painting-daily',options)
        .then(res=>res.json())
        .then(response=>this.personalPaints = response)


        
    }
    fetchDuckState() {

    }

    async fetchSaveForniture(cuerpo) {

        options = {
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(cuerpo)
        }


        await fetch('http//:localhost:3000/rewards-user')
        
    }

    async fetchCoins(cuerpo){

       var options = {
            method:'post',
            body:JSON.stringify(cuerpo),
            headers:{"Content-Type":"application/json"}
        }
        await fetch('http://localhost:3000/rewards-coins',options)
    }
}