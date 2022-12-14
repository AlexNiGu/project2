export class Audios {

    constructor() {
        this.audio
        this.audioShop = new URL("../../assets/audio/shop.mp3", import.meta.url)
        this.audioAmbient = new URL("../../assets/audio/principal.mp3", import.meta.url)
        this.audioGame = new URL("../../assets/audio/game.mp3", import.meta.url)
        this.audioClick = new URL("../../assets/audio/click.mp3", import.meta.url)
        this.audioSteps = new URL("../../assets/audio/steps.mp3", import.meta.url)
        this.audioQuack = new URL("../../assets/audio/quack.mp3", import.meta.url)
        this.audioDraw = new URL("../../assets/audio/dibujo.mp3", import.meta.url)
        this.audioLogin = new URL("../../assets/audio/login.mp3", import.meta.url)
        this.audioConversation = new URL("../../assets/audio/conversation.mp3", import.meta.url)
        this.audioSubclicK = new URL("../../assets/audio/close.mp3", import.meta.url)

    }


    playAmbientMusic() {
        this.audio = new Audio(this.audioAmbient)
        this.audio.loop = true
        this.audio.volume = 0.5
        this.audio.play()
    }

    playGameMusic() {
        this.audio = new Audio(this.audioGame)
        this.audio.loop = true

        this.audio.play()
    }

    playShopMusic() {
        this.audio = new Audio(this.audioShop)
        this.audio.loop = true
        this.audio.play()
    }

    playDrawMusic() {
        this.audio = new Audio(this.audioDraw)
        this.audio.loop = true
        this.audio.play()
    }

    playConversationMusic() {
        this.audio = new Audio(this.audioConversation)
        this.audio.loop = true
        this.audio.play()
    }

    playLoginMusic() {
        this.audio = new Audio(this.audioLogin)
        this.audio.loop = true
        this.audio.play()
    }

    playClickMusic() {
        this.audio = new Audio(this.audioClick)
        this.audio.play()
    }

    playSteps() {
        this.audio = new Audio(this.audioSteps)
        this.audio.loop = true
        this.audio.play()
    }

    playQuack() {
        this.audio = new Audio(this.audioQuack)
        this.audio.play()
    }

    playSubClick() {
        this.audio = new Audio(this.audioSubclicK)
        this.audio.play()
    }

    stopMusic() {
        this.audio.pause()
    }



}