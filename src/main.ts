import './style.css'
import garage from './garage'
import switcha from './switch';
//import winners from './winners';
//import asyncApi from './async-api';
//let winner = new winners();
let gener = new garage()
let switchP = new switcha();

//------------------------------------------------------------------------------
//Добавление
//const data = {
//    "id": 5,
//    "wins": 1,
//    "time": 10
//}


//fetch('http://127.0.0.1:3000/winners',{
//    method: "POST", // *GET, POST, PUT, DELETE, etc.
//    headers: {
//      "Content-Type": "application/json",
//    },
//    body: JSON.stringify(data), // body data type must match "Content-Type" header
//  })

//----------------------------------------------------------------------
//Изменение
//const data2 = {
//    "name": "New Red Car",
//    "color": gener.generetColorRandom(),
//}

//  fetch('http://127.0.0.1:3000/garage/1',{
//    method: "PUT", // *GET, POST, PUT, DELETE, etc.
//    headers: {
//      "Content-Type": "application/json",
//    },
//    body: JSON.stringify(data2), // body data type must match "Content-Type" header
//  })

//-----------------------------------------------------------------------------

//Удаление

//fetch('http://127.0.0.1:3000/garage/4',{
//    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
//  })

//--------------------------------------------------------------------------------------

//Получение одной машины

//fetch('http://127.0.0.1:3000/garage/93',{
//    method: "GET", // *GET, POST, PUT, DELETE, etc.
//  })

//--------------------------------------------------------------------------------------


//Старт и остановка машины

//fetch('http://127.0.0.1:3000/engine?id=1&status=started',{
//    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
//  })
//  .then(response=>response.json())
//.then(data => console.log(data))


//fetch('http://127.0.0.1:3000/engine?id=34&status=started',{
//    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
//  })
//  .then(response=>response.json())
//.then(data => console.log(data))


//id=[integer]

//status=['started'|'stopped']




//Переключатель дыижения машины


//fetch('http://127.0.0.1:3000/engine?id=1&status=drive',{
//    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
//  })
//  .then(response=>response.json())
//.then(data => console.log(data))

//fetch('http://127.0.0.1:3000/engine?id=34&status=drive',{
//    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
//  })
//  .then(response=>response.json())
//.then(data => console.log(data))


//let res = gener.getGarageApi()
//.then((Response)=>console.log(Response))
//.catch()
gener.generationOfTheGaragePage();
//switchP.getSwitchPanel()
//console.log(res)
document.querySelector<HTMLDivElement>('#app')?.append(switchP.getSwitchPanel(),gener.pageTitleRaceGarage);
//gener.resizeRoad();


