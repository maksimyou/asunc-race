interface Cars{
    name:string;
    color:string; 
    id:number;
}
interface Cars2{
    name:string;
    color:string; 
}
interface PageLimit{
    page:number;
    limit:number;
}

interface Started{
    distance:number,
    velocity:number
}
import cars from './cars-model'
console.log(cars)

class Garage{
    wrapperGarage:HTMLDivElement = document.createElement('div');
    createUpdateGarage:HTMLDivElement = document.createElement('div');
    pageTitleRaceGarage:HTMLDivElement = document.createElement('div');
    garageCount:HTMLDivElement = document.createElement('div');
    pageCount:HTMLDivElement = document.createElement('div');
    inputName:HTMLInputElement = document.createElement('input');
    inputRename:HTMLInputElement = document.createElement('input');
    inputColorCreate:HTMLInputElement = document.createElement('input');
    inputColorUpdate:HTMLInputElement = document.createElement('input');
    buttonCreate:HTMLButtonElement = document.createElement('button');
    buttonUpdate:HTMLButtonElement = document.createElement('button');
    wrapperPage:HTMLDivElement = document.createElement('div');
    wrapperCreationAndEditing:HTMLDivElement = document.createElement('div');
    prevNext:HTMLDivElement = document.createElement('div');
    selectCar:number = 0;
    arrayCars:Array<Cars>=[];
    arrayPromise:Promise<unknown>[] =[];
    constructor(){

    }
    
    pageBlockGenerate(arr:Array<Cars>){
        this.wrapperPage.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        this.wrapperPage.append( this.createRoadCars(arr[i].name,arr[i].color,arr[i].id))
    }

    }

    getGarageApi(){
        let obj:PageLimit = this.getLocalStorage()
        return fetch(`http://127.0.0.1:3000/garage?_page=${obj.page}&_limit=${obj.limit}`)
    }

    getGarageLength(){
        fetch(`http://127.0.0.1:3000/garage`)
        .then(response=>response.json())
        .then(data=> {
            this.setTheQuantity(data.length)
        })
    }

    postCreateCars(name?:string, color?:string){
        let data;
        let bullen:boolean = false;
        if(name&&color){
            data = {
                name: name,
                color: color,
            }
        }else{
            data = {
                name: this.inputName.value,
                color: this.inputColorCreate.value,
            }
            bullen = true;
    }
        

        fetch('http://127.0.0.1:3000/garage',{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response=>{
            return response.json()
        })
        .then(data=>{
            data
            if(bullen) {
                console.log(123456)
                this.buttonDisabledUpload()}
        })
        
    }

    postUpdateCars(){
        if(this.selectCar){
            const data2 = {
                name: this.inputRename.value,
                color: this.inputColorUpdate.value,
            }
            Array.from(this.wrapperPage.children).forEach(element => {
                let num = Number(element.id)
                if(num === this.selectCar){
                    element.querySelector('.name-car')!.textContent = this.inputRename.value;
                    (element.querySelector('.icon-1299198') as HTMLElement).style.color = this.inputColorUpdate.value;
                }
            });
            fetch(`http://127.0.0.1:3000/garage/${this.selectCar}`,{
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data2), // body data type must match "Content-Type" header
            })
        }
        
    }
    postDeleteCars(){
        if(this.selectCar){
            fetch(`http://127.0.0.1:3000/garage/${this.selectCar}`,{
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            })
        }
        this.buttonDisabledUpload()
        //this.updatePageGarageUniversal()
        
    }

    
    generateOneHundredCars(){
        let arrCar:Array<Cars2> = Array.from({length:100});
        arrCar = arrCar.map(() => {
            return {name:cars[Math.floor(0 + Math.random() * (0+15))],color:this.generetColorRandom()}
        })

        
        arrCar.forEach(e=>{
            this.postCreateCars(e.name,e.color);
        })
        
        console.log(arrCar)
        //this.updatePageGarageUniversal()
        this.buttonDisabledUpload()
    }

updatePageGarageUniversal(){
    this.getGarageApi()
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.pageBlockGenerate(data);
                this.arrayCars = data;
                this.getGarageLength()
                console.log(data)
            })
    }

    createRoadCars(name:string, color:string, id:number):HTMLDivElement{
        const blockRoad:HTMLDivElement = document.createElement('div');
        const blockLine1:HTMLDivElement = document.createElement('div');
        const blockLine2:HTMLDivElement = document.createElement('div');
        const blockLine3:HTMLDivElement = document.createElement('div');
        const nameCar:HTMLSpanElement = document.createElement('span');
        const img:HTMLImageElement = document.createElement('img');
        const roadLine:HTMLDivElement = document.createElement('div');

        blockRoad.id = ''+id;
        blockLine1.classList.add('create-road-cars-block1')
        blockLine2.classList.add('create-road-cars-block2')
        blockLine3.classList.add('create-road-cars-block3')
        roadLine.textContent = '-'.repeat(500);
        nameCar.classList.add('name-car');
        roadLine.classList.add('road-line');
        nameCar.textContent = name;
        nameCar.style.color = '#FFFF00';
        img.classList.add('img-flag')
        img.src = '../src/pngegg.png';
        blockLine1.append(this.createButton1('select','select', id,name,color),this.createButton1('remove','remove',id), nameCar);
        blockLine2.append(this.createManagementBtn('A',['btn-management','btn-management-active'],id),this.createManagementBtn('B',['btn-management'],id))
        blockLine3.append(this.createCar(color),img,roadLine);
        blockRoad.append(blockLine1,blockLine2,blockLine3)
        return blockRoad;
    }

    createButton1(text:string,classs:string,id?:number,name?:string,color?:string):HTMLButtonElement{
        const button:HTMLButtonElement= document.createElement('button');
        if(text==='select'){
            button.addEventListener('click',()=>{
                this.inputRename.disabled = false;
                this.inputColorUpdate.disabled = false;
                this.buttonUpdate.disabled = false;
                this.inputRename.value = name as string;
                color: this.inputColorUpdate.value = color as string;
                this.selectCar = id as number;
            })
        }
        if(text==='remove'){
            button.addEventListener('click',()=>{
                this.selectCar = id as number;
                this.postDeleteCars()
            })
        }
        if(classs === 'generate-cars'){
            button.addEventListener('click',()=>{
                this.generateOneHundredCars()
            })
            
        }
        if(text  === 'UPDATE'){
            button.disabled = true;
        }
        button.classList.add('custom-btn', 'btn-2',classs)
        button.textContent = text;
        if(classs === 'generate-cars'){
            button.style.width = '120px'
        }
        return button;
    }

    createButton2(text:string,classs:string):HTMLButtonElement{
        const button:HTMLButtonElement= document.createElement('button');
        if(text==='prev'){
            button.addEventListener('click',()=>{
                this.setPageLimit('prev')
            })
        }
        if(text==='next'){
            button.addEventListener('click',()=>{
                this.setPageLimit('next')
            })
        }
        if(text === 'RACE'){
            button.addEventListener('click',()=>{
                this.RaceGarage()
            })
            
        }

        if(text === 'RESET'){
            button.addEventListener('click',()=>{
                this.ResetGarage()
            })
            
        }

        
        button.classList.add('custom-btn', 'btn-3',classs)
        button.textContent = text;
        return button;
    }

    createManagementBtn(text:string,classs:Array<string>, id:number):HTMLDivElement{
        const btn:HTMLDivElement = document.createElement('div');
        if(text === 'A'){
            btn.addEventListener('click',(e)=>{
                this.startedCar(id, e.currentTarget as HTMLElement);
            })
        }
        if(text === 'B'){
            btn.addEventListener('click',(e)=>{
                this.stopedCar(id, e.currentTarget as HTMLElement);
            })
        }

        btn.classList.add(...classs)
        btn.textContent = text;
        return btn;
    }

    createCar(color?:string):HTMLDivElement{
        const car:HTMLDivElement = document.createElement('div'); 
        car.addEventListener('transitionend', function(e) {
            console.log(e);
            (e.target as HTMLElement).style.left = '85%';
          });
        car.classList.add('icon-1299198');
        if(color === undefined){
            car.style.color = this.generetColorRandom();
        }else{
            car.style.color = color;
        }
        return car;
    }

    generetColorRandom():string{
    let colorCar:string = '#';
        colorCar+=(Math.floor(16+Math.random()*(255-16))).toString(16);
        colorCar+=(Math.floor(16+Math.random()*(255-16))).toString(16);
        colorCar+=(Math.floor(16+Math.random()*(255-16))).toString(16);
        return colorCar;
    }

    setTheQuantity(count:number):void{
        this.garageCount.textContent = `Garage (${count})`;
        this.garageCount.classList.add('set-the-quantity')
    }

    //getTheQuantity():number{
    //    let countPlus:string|null = this.garageCount.textContent;
    //    console.log('sdfsf',countPlus,this.garageCount.textContent);
    //    let res = countPlus?.replace(/[Garage|()| ]+/g,'')
    //    let num:number = Number(res);
    //    console.log(num)
    //   return num
    //}

    setThePages(count:number):void{
        this.pageCount.textContent = `Page #${count}`;
        this.pageCount.classList.add('set-the-pages')
    }

    generationOfTheGaragePage(bullens?:boolean){  
        if(!localStorage.getItem('pageLimit')){
            localStorage.setItem('pageLimit',JSON.stringify({
                page:1,
                limit:7
            }) )
        }
        if(!localStorage.getItem('pageLimitWin')){
            localStorage.setItem('pageLimitWin',JSON.stringify({
                page:1,
                limit:7
            }) )
        }
        if(!localStorage.getItem('order')){
            localStorage.setItem('order',JSON.stringify({
                wins:'ASC',
                id:'ASC',
                time:'ASC'
            }) )
        }

        
        this.getGarageApi()
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.pageBlockGenerate(data);
            this.arrayCars = data;
            console.log(data)
        })
        this.getGarageLength()//запускается асинхронно

        let obj:PageLimit = this.getLocalStorage();
        this.setThePages(obj.page);
        this.panelPrevNext();
        this.garageCreationAndEditingPanel();
        this.pageTitleRaceGarage.innerHTML = '';
        console.log(this.pageTitleRaceGarage.cloneNode())
        this.pageTitleRaceGarage.append(this.wrapperCreationAndEditing,this.garageCount,this.pageCount,this.wrapperPage,this.prevNext);
        if(bullens){
            let app:HTMLCollection|undefined = document.getElementById('app')?.children;

            for (let i = 1; i < app!.length; i++) {
            app![i].remove();  
        }
            document.querySelector<HTMLDivElement>('#app')?.append(this.pageTitleRaceGarage);
        }
    }
    
    garageCreationAndEditingPanel(){
        const blockLine1:HTMLDivElement = document.createElement('div');
        const blockLine2:HTMLDivElement = document.createElement('div');
        const blockLine3:HTMLDivElement = document.createElement('div');
        blockLine1.classList.add('garage-creation-and-editing-panel-block1');
        blockLine2.classList.add('garage-creation-and-editing-panel-block2');
        blockLine3.classList.add('garage-creation-and-editing-panel-block3');
        this.inputName.classList.add('input-name');
        this.inputRename.classList.add('input-rename');
        this.inputRename.disabled = true
        this.inputColorCreate.type = 'color';
        this.inputColorUpdate.type = 'color';
        this.inputColorUpdate.disabled = true;
        this.buttonCreate = this.createButton1('CREATE','create');
        this.buttonCreate.addEventListener('click',()=>{
            this.postCreateCars();
            //this.updatePageGarageUniversal();
        })
        this.buttonUpdate = this.createButton1('UPDATE','update');
        this.buttonUpdate.addEventListener('click',()=>{
            this.postUpdateCars()
            this.inputRename.disabled = true;
            this.inputColorUpdate.disabled = true;
            this.buttonUpdate.disabled = true;
        })
        blockLine1.append(this.inputName,this.inputColorCreate,this.buttonCreate);
        blockLine2.append(this.inputRename,this.inputColorUpdate,this.buttonUpdate);
        blockLine3.append(this.createButton2('RACE','RACE'),this.createButton2('RESET','RESET'),this.createButton1('GENERATE CARS','generate-cars'));
        this.wrapperCreationAndEditing.innerHTML = '';
        this.wrapperCreationAndEditing.append(blockLine1,blockLine2,blockLine3);
    }


    panelPrevNext(){
        console.log(this.garageCount.textContent)
        this.prevNext.innerHTML = '';
        this.prevNext.append(this.createButton2('prev','prev'),this.createButton2('next','next'));
        this.prevNext.classList.add('prev-next')
        this.buttonDisabledUpload();
        return this.prevNext;
    }

    setPageLimit(str2:string){
        if(str2 === 'next'){
            this.buttonDisabled(str2,(document.querySelector('.next') as HTMLButtonElement))
                //this.updatePageGarageUniversal() 
        }
        

        if(str2 === 'prev'){
            this.buttonDisabled(str2,(document.querySelector('.prev') as HTMLButtonElement))
            //this.updatePageGarageUniversal()
        }
    }


    nexPageGarage(){
        this.getGarageApi()
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.pageBlockGenerate(data);
                    this.arrayCars = data;
                    console.log(data)
                })
        }

        getLocalStorage():PageLimit{
            let obj:PageLimit;
            let str:string = localStorage.getItem('pageLimit') as string
            JSON.parse(str)
            obj = JSON.parse(str)
            return obj;
        }


        buttonDisabled(text:string, btn:HTMLButtonElement){
            let obj:PageLimit = this.getLocalStorage();
            fetch(`http://127.0.0.1:3000/garage`)
            .then(response=>response.json())
            .then(data=> {
            let len:number;
            len = data.length
            if(text==='prev'){
                console.log(obj.page)
                obj.page -= 1
                if(obj.page > 1){
                    if(obj.page !== Math.ceil(len/7)){
                        btn.disabled = false;
                        (document.querySelector('.next') as HTMLButtonElement).disabled = false;
                    }else{
                        btn.disabled = false;
                        (document.querySelector('.next') as HTMLButtonElement).disabled = true;
                    }
                }else if(obj.page === 1){
                    btn.disabled = true;
                    if(obj.page === Math.ceil(len/7)){
                        (document.querySelector('.next') as HTMLButtonElement).disabled = true;
                    }else{
                        (document.querySelector('.next') as HTMLButtonElement).disabled = false;
                    }
                }
                
            }
            

            if(text==='next'){
                obj.page += 1;
                if(obj.page === Math.ceil(len/7)) {
                        //obj.page -= 1;
                        btn.disabled = true;
                        if(obj.page !== 1) {
                            (document.querySelector('.prev') as HTMLButtonElement).disabled = false;
                        }
                }else if(obj.page < Math.ceil(len/7)){
                        btn.disabled = false;
                        if(obj.page !== 1) {
                            (document.querySelector('.prev') as HTMLButtonElement).disabled = false;
                        }
                    }


            }
            this.setThePages(obj.page);
            localStorage.setItem('pageLimit',JSON.stringify(obj));
            this.updatePageGarageUniversal();
        })
        }


        buttonDisabledUpload(){
            let obj:PageLimit = this.getLocalStorage();
            console.log(obj.page,Math.ceil(1/7))

            fetch(`http://127.0.0.1:3000/garage`)
            .then(response=>response.json())
            .then(data=> {
                let len:number;
                len = data.length;
                console.log(obj.page,Math.ceil(len/7))
                if(obj.page === Math.ceil(len/7)){
                    console.log(1);
                    (document.querySelector('.prev') as HTMLButtonElement).disabled = true;
                    (document.querySelector('.next') as HTMLButtonElement).disabled = true;
                }

                if(obj.page === 1 && obj.page < Math.ceil(len/7)){
                    console.log(2);
                    (document.querySelector('.prev') as HTMLButtonElement).disabled = true;
                    (document.querySelector('.next') as HTMLButtonElement).disabled = false;
                }

                if(obj.page > 1 && obj.page === Math.ceil(len/7)){
                    console.log(3);
                    (document.querySelector('.prev') as HTMLButtonElement).disabled = false;
                    (document.querySelector('.next') as HTMLButtonElement).disabled = true;
                }

            this.updatePageGarageUniversal() 
        })

        }

    startedCar(id:number, elem:HTMLElement){
        localStorage.setItem('started','true');
        fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`,{
                method: "PATCH", // *GET, POST, PUT, DELETE, etc.
            })
            .then(response=>response.json())
            .then(data => {
                console.log(data,'--------------------------')
                this.arrayPromise.push(this.driveCar(id,elem,data))
                console.log(this.arrayPromise); 
            })
    }


    stopedCar(id:number, elem:HTMLElement){
        if(localStorage.getItem('started') === 'true') localStorage.setItem('stoped','true');
        fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`,{
            method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        })
        .then(response=>response.json())
        .then(data => {
            console.log(data);
            (elem.parentElement!.nextSibling?.childNodes[0] as HTMLElement).style.animation = '';
            (elem.parentElement!.nextSibling?.childNodes[0] as HTMLElement).style.left = `${0}%`
        })
    }


    async driveCar(id:number,elem:HTMLElement, obj:Started):Promise<unknown>{
       return new Promise((resolve, reject) => {

            (elem.parentElement!.nextSibling?.childNodes[0] as HTMLElement).style.animation = `go-left-right ${obj.distance/obj.velocity}ms forwards`;
            let start = Date.now();
            fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`,{
                    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                })
                .then(response=> response.json())
                    .then(data => {
                        console.log(localStorage.getItem('stoped')!=='true', localStorage.getItem('started')=== 'true');
                        if(localStorage.getItem('stoped')!=='true'&&localStorage.getItem('started')=== 'true'){
                            console.log(1,data);
                            (elem.parentElement!.nextSibling?.childNodes[0] as HTMLElement).style.left  = '85%';
                            
                        }
                        let timePassed = Date.now() - start;
                        let str:string = (timePassed/1000).toFixed(1)
                        resolve({time:Number(str), ids:id});
                        console.log(data);
                        localStorage.removeItem('stoped');
                        localStorage.removeItem('started');
                })
                .catch(data=>{
                    if(localStorage.getItem('stoped')!=='true'&&localStorage.getItem('started')=== 'true'){
                        (elem.parentElement!.nextSibling?.childNodes[0] as HTMLElement).style.animationPlayState = 'paused';
                    }
                    reject('ОШЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫБКА');
                    console.log(data.message);
                    localStorage.removeItem('stoped');
                    localStorage.removeItem('started');
                })
          });
    }

    createWinner(id:number,time:number){
        console.log(id)
        const data = {
            "id": id,
            "wins": 1,
            "time": time
        }

        fetch(`http://127.0.0.1:3000/winners?id=${id}`)
        .then(response=> {
            
            console.log(response)
            return response.json()})
        .then(datas=>{
            console.log(datas[0],datas[0].wins+1)
            let data2= {
                wins: datas[0].wins+1,
                time: time
            }
            fetch(`http://127.0.0.1:3000/winners/${id}`,{
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data2), // body data type must match "Content-Type" header
            })


            //------------------------------------------------------------------
        })
        .catch(()=>{

            fetch(`http://127.0.0.1:3000/winners`,{
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
            })


            //------------------------------------------------------------------
        })
    }

    RaceGarage(){
        this.arrayPromise= [];
        document.querySelectorAll('.btn-management-active').forEach(e=>{
            (e as HTMLElement).click();
        })
    setTimeout( ()=>{
        Promise.any(this.arrayPromise)
        .then((value:any) =>{
            console.log(value)
            this.createWinner(value.ids,value.time)
            
        })
        },2000)
    }

    ResetGarage(){
        document.querySelectorAll('.icon-1299198').forEach(e=>{
            (e as HTMLElement).style.animation = '';
            (e as HTMLElement).style.left = `${0}%`
        })
    }

}
export default Garage;