var express = require('express');
let socket  = require('socket.io');
let animalj  = require(__dirname+'/animals.json');
let get_behaviour = require(__dirname+'/get_behaviour.js').get_behaviour;
let up_area_stat        = require(__dirname+'/area_obj.js').up_area_stat;
let global_area_stat    = {};
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
    
    socket.on('default_status',default_status =>{
        console.log("status: ",default_status);
        global_area_stat.default = true;
        global_area_stat.meta    = default_status;
        (async function get_stat(){
            const status = await up_area_stat(default_status);
            global_area_stat.full_area = status.full_area;
            global_area_stat.empty_area = status.empty_area;
            console.log(global_area_stat);
            // io.sockets.emit('default_status0',status);
        })()
    });
    
    
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
        (async function get_promise(){
            // try{
                const actual_behaviour =  await get_behaviour(single_animal.name);
                single_animal.action = actual_behaviour;
                console.log(single_animal);
                io.sockets.emit('bhv_channel',single_animal);
            })();
        });
        socket.on('start_cycle',data =>{
            if (data) {
                console.log('start cycle!');
                console.log(data);
                // console.log(global_area_stat)    
                // let area_object = {}
                if(global_area_stat.default === true){
                    global_area_stat.default = false;
                    processing_objects(data);
                    
                }else{
                    // area_object = {};
                    let check_availability = global_area_stat.meta.filter(e =>{
                        return e < 1 ;
                    });
                    if (check_availability != null ){
                        //TO DO: CALLEBLE ASYNC FUNC FOR LESS CODE
                        processing_objects(data);
                    }
                    
                }
                //else it's gonna be a loop probably for other status than default
                //TO DO!!!!!!    
               
            }
                    
                    
                    
                    // *************TO DO LOOP AND SEND THE ACTIONS BACK ON ONE OF THE AREAS USING ASYNC AND THE
                    // **********DELAY FUNCTION    
                    //loop
                    // io.sockets.emit()    
                    
                });    
                
                // });
                
                
                
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
            //--------get index of next available area---------------------
            let get_available_area = () =>{
                    return new Promise(resolve =>{
                        
                        let x = global_area_stat.meta.find(e =>{
                                return e === 0;
                        });
                        let ind_x = global_area_stat.meta.indexOf(x);        
                        resolve(ind_x);

                    })
            };

            let processing_objects = async function(data){
                area_object = {};
                const area_idx          = await get_available_area();
                // let idx2 = area_idx;
                global_area_stat.meta[area_idx] = 1;
                const run_x             = await up_area_stat(global_area_stat.meta)    
                // console.log(run_x);
                const area_behaviour    = await get_behaviour(data);  
                console.log(area_behaviour);
                global_area_stat.full_area = run_x.full_area;
                global_area_stat.empty_area = run_x.empty_area;
                area_object.area = global_area_stat.full_area[area_idx];
                area_object.name = data;
                area_object.action = area_behaviour;
                 
                io.sockets.emit('area_channel',area_object);
            
                console.log(global_area_stat);
                console.log(area_object);

            }

                        //-------------------------------------------------------------
                        
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
