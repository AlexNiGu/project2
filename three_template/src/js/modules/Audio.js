export class Audios{

    constructor(){
        this.audio
        this.audioShop = new URL("../../assets/audio/shop.mp3", import.meta.url)

    }


    playAmbientMusic(){
        
    }

    playPlayMusic(){
        
    }

    playShopMusic(){
        this.audio = new Audio(this.audioShop)
        this.audio.loop = true
        this.audio.play()
    }

    playDrawMusic(){

    }

    stopMusic(){
        this.audio.pause()
    }



}