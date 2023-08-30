//import garage from './garage' 
//import winners from './winners' 

//const garagge = new garage();
//const winnerss = new winners();


import winners from './winners';
import garage from './garage'
let gener = new garage()

const win = new winners();

class Switch{
switchPanel:HTMLDivElement = document.createElement('div');
garage:HTMLButtonElement = this.createButton2('TO GARAGE','to-garage');
winners:HTMLButtonElement = this.createButton2('TO WINNERS','to-winners');


createButton2(text:string,classs:string):HTMLButtonElement{
    const button:HTMLButtonElement= document.createElement('button');
    button.classList.add('custom-btn', 'btn-3',classs)
    button.textContent = text;
    return button;
}

getSwitchPanel():HTMLDivElement{
    this.switchPanel.classList.add('switch-panel');
    this.winners.addEventListener('click',()=>{
        let app:HTMLCollection|undefined = document.getElementById('app')?.children;

        for (let i = 1; i < app!.length; i++) {
            app![i].remove();  
        }
        console.log(document.getElementById('app')!.cloneNode());
        document.getElementById('app')!.append(win.generationWinner())
    })

    this.garage.addEventListener('click',()=>{
        console.log(document.getElementById('app')!.cloneNode());
        gener.generationOfTheGaragePage(true);
    })

    
    this.switchPanel.append(this.garage,this.winners);
    return this.switchPanel;
}

//generGarage(){
//this.garage.addEventListener('click',()=>{
//    let app:HTMLElement = document.getElementById('app')?.children[1] as HTMLElement;
//    app.innerHTML = '';
//    gener.generationOfTheGaragePage()
//    document.querySelector<HTMLDivElement>('#app')?.append(gener.pageTitleRaceGarage);
//})

//}



}
export default Switch;