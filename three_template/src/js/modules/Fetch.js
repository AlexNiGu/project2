import { useReducer } from "react"


export class Fetch {

    constructor() {

        this.paint = {}
        this.personalPaints = {}
        this.test = {}
        this.shopFornitures = {}
    }

    async fetchGetPaiting(){

        console.log('hola has entrado en painting')
        const idPaint = await JSON.parse(localStorage.getItem('user'))

        var cuerpo = {
            IdDibujo:idPaint.Numdibujos
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

        const idTest = await JSON.parse(localStorage.getItem('user'))

        var cuerpo = {
            IdTest:idTest.Numtest
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

        const u = await JSON.parse(localStorage.getItem('user'))

        /**ESTE CUERPO TIENE QUE LLEGAR POR PARAMETRO PERO TE DEJO LA PLANTILLA DE COMO TIENE QUE QUEDAR PARA SER ENVIADO */
        var cuerpo = {
            IdUser:u.IdUser,
            IdTest:u.Numtest+1,
            Respuesta1:'la respuesta que sea en INTEGER',
            Respuesta2:'la respuesta que sea en INTEGER',
            Respuesta3:'la respuesta que sea en INTEGER',
            Respuesta4:'la respuesta que sea en INTEGER',
            Respuesta5:'la respuesta que sea en INTEGER'
        }

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

    fetchShop() {
        
    }
}