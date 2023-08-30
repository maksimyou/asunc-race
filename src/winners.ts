interface Winners{
    id: number,
    wins: number,
    time: number
}
interface Cars{
    name: string,
    color: string,
    id: number
}
interface PageLimit{
    page:number;
    limit:number;
}
interface PageLimitOrder{
    page:number;
    limit:number;
    wins:string,
    id:string,
    time:string
}
interface Order{
    wins:string,
    id:string,
    time:string
}

class Winners{
    wrapperWinners:HTMLDivElement = document.createElement('div');
    winnersCount:HTMLDivElement = document.createElement('div');
    pageCountWinners:HTMLDivElement = document.createElement('div');
    panelWinnersWrap:HTMLDivElement = document.createElement('div');
    headerTitleGroup:HTMLDivElement = document.createElement('div');

    setTheQuantity(count:number):void{
        this.winnersCount.textContent = `Winners (${count})`;
        this.winnersCount.classList.add('set-the-quantity')
    }

    setThePages(count:number):void{
        this.pageCountWinners.textContent = `Page #${count}`;
        this.pageCountWinners.classList.add('set-the-pages')
    }

    setSortLocalStorage(wins:string, id:string,time:string){
        localStorage.setItem('order',JSON.stringify({
            wins:wins,
            id:id,
            time:time
        }) )
    }
    sortUniversalHandler(arg:string){
        let obj:PageLimitOrder = this.getLocalStorage();
        this.sortWinnersApi(obj.page,obj.limit,arg,obj.id)
        .then(response=> response.json())
        .then((data:Array<Winners>)=>{
            this.getGarageApi()
            .then(response=>response.json())
            .then((data2:Array<Cars>)=> {
                const winnersList:HTMLDivElement = document.createElement('div');
                let ids = data.map(e => e.id);
                let cars = data2.filter(e => { if(ids.includes(e.id)) return e;})
                console.log(data,cars)
                winnersList.innerHTML = '';
                data.forEach((elem, i) => { 
                    console.log(cars[i],elem);
                    winnersList.append(this.createListResult(elem.id, cars[i].color, cars[i].name, elem.wins, elem.time))
                })
                this.panelWinnersWrap.children[1].remove();
                this.panelWinnersWrap.append(winnersList);
            })
        })
        if(arg=== 'id') obj.id === 'ASC'? obj.id = 'DESC':obj.id = 'ASC';
        if(arg=== 'wins') obj.wins === 'ASC'? obj.wins = 'DESC':obj.wins = 'ASC';
        if(arg=== 'time') obj.time === 'ASC'? obj.time = 'DESC':obj.time = 'ASC';

        this.setSortLocalStorage(obj.wins, obj.id,obj.time)
    }
    generHeaderTitleGroup():HTMLDivElement{
        const generHeaderTitleGroupWrap:HTMLDivElement = document.createElement('div');
        generHeaderTitleGroupWrap.classList.add('gener-header-title-group')
        const carBlock:HTMLDivElement = document.createElement('div');
        const idBlock:HTMLDivElement = document.createElement('div');
        const winsBlock:HTMLDivElement = document.createElement('div');
        const timeBlock:HTMLDivElement = document.createElement('div');
        const nameeBlock:HTMLDivElement = document.createElement('div');

        idBlock.addEventListener('click',()=>{
            this.sortUniversalHandler('id')
        })

        winsBlock.addEventListener('click',()=>{
            this.sortUniversalHandler('wins')
        })

        timeBlock.addEventListener('click',()=>{
            this.sortUniversalHandler('time')
        })

        carBlock.textContent = 'Car'
        idBlock.textContent = 'Number'
        winsBlock.textContent = 'Wins'
        timeBlock.textContent = 'Best time (seconds)'
        nameeBlock.textContent = 'Name'
        generHeaderTitleGroupWrap.append(idBlock,carBlock,nameeBlock,winsBlock,timeBlock)
        return generHeaderTitleGroupWrap;
    }

    panelWinners(arr:Array<Winners>,arr2:Array<Cars>){

        const winnersList:HTMLDivElement = document.createElement('div');
        console.log(arr)
        let ids = arr.map(e => e.id);
        let cars = arr2.filter(e => { if(ids.includes(e.id)) return e;})
        console.log(arr,cars)
        arr.forEach((elem, i) => {
            console.log(cars[i])
            winnersList.append(this.createListResult(elem.id, cars[i].color, cars[i].name, elem.wins, elem.time))
        })
        this.panelWinnersWrap.innerHTML = '';
        this.panelWinnersWrap.append(this.generHeaderTitleGroup(),winnersList) 
    }

    getWinnersApi(page:number, limit:number){
        return fetch(`http://127.0.0.1:3000/winners?_page=${page}&_limit=${limit}`)
    }

    sortWinnersApi(page:number,limit:number,sort:string,order:string){
        return fetch(`http://127.0.0.1:3000/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`)

    //page=[integer]
    //limit=[integer]
    //sort=['id'|'wins'|'time']
    //order=['ASC'|'DESC']
    }

    getGarageApi(){
        return fetch(`http://127.0.0.1:3000/garage`)
    }

    generationWinner():HTMLDivElement{
        let obj:PageLimitOrder = this.getLocalStorage();

        this.getWinnersApi(obj.page, obj.limit)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            this.setTheQuantity(data.length)
            this.setThePages(Math.ceil(data.length/7))
            this.getGarageApi()
            .then(response=>response.json())
            .then(data2=> this.panelWinners(data,data2))
        })

        this.wrapperWinners.append(this.winnersCount,this.pageCountWinners,this.panelWinnersWrap)
        return this.wrapperWinners;
    }

    createListResult(id:number,car:string,name:string, wins:number,time:number):HTMLDivElement{
        const listBlock:HTMLDivElement = document.createElement('div');
        listBlock.classList.add('list-result')
        const carBlock:HTMLDivElement = document.createElement('div');
        carBlock.classList.add('icon-1299198');
        carBlock.classList.add('wins');
        const idBlock:HTMLDivElement = document.createElement('div');
        const winsBlock:HTMLDivElement = document.createElement('div');
        const timeBlock:HTMLDivElement = document.createElement('div');
        const nameeBlock:HTMLDivElement = document.createElement('div');
        idBlock.textContent = id.toString();
        carBlock.style.color = car;
        winsBlock.textContent = wins.toString();
        timeBlock.textContent = time.toString();
        nameeBlock.textContent = name;
        listBlock.append(idBlock,carBlock,nameeBlock,winsBlock,timeBlock);
        return listBlock;
    }



    getLocalStorage():PageLimitOrder{
        let obj:PageLimit;
        let obj2:Order;
        let str:string = localStorage.getItem('pageLimitWin') as string
        let str2:string = localStorage.getItem('order') as string
        obj = JSON.parse(str)
        obj2 = JSON.parse(str2)
        let allObj:PageLimitOrder = Object.assign(obj, obj2)
        return allObj;
    }


    //buttonDisabled(text:string, btn:HTMLButtonElement){
    //    let obj:PageLimit = this.getLocalStorage();
    //    fetch(`http://127.0.0.1:3000/garage`)
    //    .then(response=>response.json())
    //    .then(data=> {
    //    let len:number;
    //    len = data.length
    //    if(text==='prev'){
    //        console.log(obj.page)
    //        obj.page -= 1
    //        if(obj.page > 1){
    //            if(obj.page !== Math.ceil(len/7)){
    //                btn.disabled = false;
    //                (document.querySelector('.next') as HTMLButtonElement).disabled = false;
    //            }else{
    //                btn.disabled = false;
    //                (document.querySelector('.next') as HTMLButtonElement).disabled = true;
    //            }
    //        }else if(obj.page === 1){
    //            btn.disabled = true;
    //            if(obj.page === Math.ceil(len/7)){
    //                (document.querySelector('.next') as HTMLButtonElement).disabled = true;
    //            }else{
    //                (document.querySelector('.next') as HTMLButtonElement).disabled = false;
    //            }
    //        }
            
    //    }
        

    //    if(text==='next'){
    //        obj.page += 1;
    //        if(obj.page === Math.ceil(len/7)) {
    //                //obj.page -= 1;
    //                btn.disabled = true;
    //                if(obj.page !== 1) {
    //                    (document.querySelector('.prev') as HTMLButtonElement).disabled = false;
    //                }
    //        }else if(obj.page < Math.ceil(len/7)){
    //                btn.disabled = false;
    //                if(obj.page !== 1) {
    //                    (document.querySelector('.prev') as HTMLButtonElement).disabled = false;
    //                }
    //            }


    //    }
    //    this.setThePages(obj.page);
    //    localStorage.setItem('pageLimitWin',JSON.stringify(obj));
    //    //this.updatePageGarageUniversal();
    //})
    //}
    
}

export default Winners;
