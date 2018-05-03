var express = require('express');
let socket  = require('socket.io');
let animalj  = require(__dirname+'/animals.json');
// let animals = require(__dirname+'/create_animal.js').animals;
// let show_behv = require(__dirname+'/show_behv.js').f;
// var path = require('path');
let path = __dirname + '/Src/index.html';
// var open = require('open');
var port = 3000;
var app = express(); // initialize, instantiate
// app.use('/',express.static(__dirname + '/')); //directory of js scripts for client side (HTML DOM scripts)
app.use(express.static(__dirname + '/Src')); //directory of js scripts for client side (HTML DOM scripts)
//***************************************************************** */
let server = app.listen(port); //set the server
let io = socket(server);   //set socket.io to work on the server


let getanimalname = new Promise((resolve,reject) =>{
    let animals = [];
    animalj.forEach(element => {
        animals.push(element.name)
    });
    if (animals.length > 0){
        resolve(animals); 


    }else{
        reject('Animals array empty!');
    }
    
});

// const delay = new Promise((resolve,reject)=> setTimeout((resolve),1000));   //nu merge

const delay = (ms) => {

    return new Promise((resolve,reject) => {       //merge
      setTimeout(resolve,ms);   
    });                                                         
}




//to do get, one animal at a time

//use in a async function both

io.on('connection',function(socket){  //set connection, fiecare instanta (tab) la pagina sau fiecare client are un socket.id diferit
    console.log('connection made',socket.id);

    socket.on('getanimal_ch',animaltrue =>{
        if(animaltrue === true){
            console.log('flag received!');

            (async function loop(){
                const animal_promised = await getanimalname;  //animal_promised ia valoarea rezolvarii lui getanimalname,un array
                for(let i =0;i<animal_promised.length;i++){ 
                    await delay(1000);                              //merge
                    // await delay;
                    //  await new Promise((resolve,reject)=>        //merge    
                    //     setTimeout((resolve),1000));                 
                    
                     io.sockets.emit('animal_channel',animal_promised[i]);
                }
            })();            




        }

    });

    socket.on('a_object_ch',single_animal => {
        console.log(single_animal);

    });


    
    // getanimalname.then(pdata =>{
        
    //         for(let i =0;i<pdata.length;i++){                      //not practical
    //             setTimeout(()=>{
    //                 io.sockets.emit('animal_channel',pdata[i]);
    //                 },1000 * i);   

    //         }


    // })

    
    // io.sockets.emit('one', 1);
    
    //  let int = setInterval(()=>{
         
    //      io.sockets.emit('date',Date.now());

    //  },10)


    //  socket.emit('jesus was here!')
     
});

// app.get('/', function(request, response){  
    
//     response.sendFile(path);
//     // response.json(animals);
    
// });







// app.listen(port, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         open('http://localhost:' + port);
//     }

// });
