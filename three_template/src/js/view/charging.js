export class ChargingPage{

    renderPage(){

        var myPage = `
        <div class='charging-page' id='charging-page'>
            <div class="loader"></div>
        </div>
      `
      return myPage
    }

    // magicPage(){
    //     document.getElementById('charging-page').classList.add('vanish')
    //     setTimeout(()=>{

    //     },3300)
    // }

    // destroyPage(){
    //    let node = document.getElementById('charging-page')
    //    node.parentNode.removeChild(node)
    // }
}