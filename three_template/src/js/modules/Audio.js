export class Audios{



    constructor(){
        this.audioShop = '../../assets/audio/shop.mpeg'
    }



    playShopMusic(){

        var audio = new Audio(this.audioShop)
        audio.play()

    }

    stopShopMusic(){

    }



}