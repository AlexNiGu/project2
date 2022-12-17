export class Audios{

    constructor(){
        this.audio
        this.audioShop = new URL("../../assets/audio/shop.mp3", import.meta.url)

    }



    playShopMusic(){

        this.audio = new Audio(this.audioShop)
        this.audio.loop = true
        this.audio.play()

    }

    stopMusic(){
        this.audio.pause()
    }



}