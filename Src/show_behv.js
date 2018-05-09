//let animals = require(__dirname+'/create_animal.js').animals;
// let animalj  = require(__dirname+'/animals.json');
let socket = io.connect('http://localhost:3000/',{'force new connection': true});
// let ch_area_stat        = require(__dirname+'/area_obj.js').ch_area_stat;
let output_animal       = document.getElementById('output_animal');
let getAnimals          = document.getElementById('getAnimals');
let output_animal_test  = document.getElementById('receive_animals');
let animalx             = document.getElementById('animalx');
let spanx               = document.getElementById('spanx');
let get_bhv             = document.getElementById('get_bhv');
let start_cycle         = document.getElementById('Start_cycle');
let area_1              = document.getElementById('area_1');
let area_2              = document.getElementById('area_2');
let area_3              = document.getElementById('area_3');
let cnt                 = 0;

window.addEventListener('load', function() {
    console.log('All assets are loaded')
    start_cycle.disabled = true;
    let default_status = [0,0,0];
    socket.emit('default_status',default_status)
    // start_cycle.style.show_hover = '';
  })

let activate_button = ()=>{
    start_cycle.disabled = false;
    start_cycle.className = "button_default hover_class";
}

// let animalspan = document.getElementById('animalspan');

// socket.on('one',data =>{
    
    //     document.write(data);
    
    // })
    // *************************************************
    
// start_cycle.addEventListener("click",()=>{
//     let cancel_flag = true;
//     // alert('canceling the events!')
//     socket.emit("cancel_e_channel",cancel_flag);
//     // return cancel_flag;
// })    

// alert(a);

// executa o singura data eventul pe click, se sterge eventul la apelare prin "once"
let once = () =>{
    let animalflag = true;
         alert("animal request sent!");
        socket.emit('getanimal_ch',animalflag);
        getAnimals.removeEventListener("click",once);
    }   
    getAnimals.addEventListener("click",once);
    
    
    // animalspan.addEventListener("click", ()=>{
        //          alert("hello!");
        // })
        
        // spanx.onclick(()=>{
            //     alert("hello");
            // });
            // spanx.addEventListener("click",()=>{
                //     alert("hello!");
                // });
                
                
                //to do
                // socket.on('cancel_e_channel2',cancel_flag=>{
                    //     alert("cancel flag received!");
                    //     return cancel_flag;
                    
                    // })
                    
    socket.on('animal_channel',animal =>{
        let animal_span = document.createElement('span');
        // animal_span.id='spanx';
        animal_span.className = 'animal';
        // animal_span.onclick(()=>{
            //         alert("hello");
            //     });
            animal_span.innerHTML = animal + ' ';
            // animal_span.onmouseover=
            animal_span.addEventListener("click",()=>{
                let animal_promised =  new Promise((resolve,reject)=>{
                    if(animal){
                        let animal_object = {};
                        animal_object.name = animal;
                        resolve(animal_object);
                    }else{
                        reject("No animal for the event!");
                    }
                    
                });
                
                (async function (){
                    const single_animal = await animal_promised;
                    socket.emit('a_object_ch',single_animal);
                    
                })();
                
                // alert("hello!");
            });
            
            // let animal_node = document.createTextNode(animal + ' ');
            // animal_span.appendChild(animal_node);
            
            // animal_span.appendChild(animal_node).addEventListener('click',() => {
                //             alert('hello!');
                
                // });
                // animal_span.appendChild(animal_node);
                // output_animal_test.innerHTML += '<span id ="animalspan">'+ animal + '</span>';
                output_animal_test.appendChild(animal_span);
                // output_animal_test.innerHTML += animal_span;
                // output_animal_test.appendChild(animal_node) ;
                
                
            });
                            
                            
    //********display the animal actions in the bhv area */
    socket.on('bhv_channel',animal_data =>{
        // alert(bhv_data);
        if (cnt === 0 ){
            activate_button();
        }
        let bhv_string = '';
    
    animal_data.action.forEach(e =>{
        let c_element = e + ' ';
        bhv_string += c_element;
        
    });
   
    get_bhv.innerHTML = animal_data.name + " actions: " + bhv_string;
    cnt +=1;
});


start_cycle.addEventListener("click",()=>{
    // let cycle_flag = true;
    
    let get_final_a = new Promise(resolve =>{

        let new_a_obj = {};
        let a_cycle_data = get_bhv.innerHTML.split(" ");
        new_a_obj.name = a_cycle_data[0];
        new_a_obj.actions = a_cycle_data.filter(e =>{
            if (e !== a_cycle_data[0] && e!==a_cycle_data[1]){
                return e;
            }
    
        });
//# bugfix for : "special","move". should be "special move"   !!!!
//  ##### not needed anymore, the server handles it, cleanup to be done
        (() => {
            const string_a = 'special move';
            const i_sp   = new_a_obj.actions.indexOf('special');
            const i_m   = new_a_obj.actions.indexOf('move');
            new_a_obj.actions.splice(i_sp,1);
            new_a_obj.actions.splice(i_m,1);
            new_a_obj.actions.splice(i_sp,0,string_a);
        })();
//# bugfix

        resolve(new_a_obj);

    });

    
    // hard way: send all the data back, too much processing involved
    (async function (){
        const final_animal = await get_final_a;
        // area_1.innerHTML = "<p>"+ final_animal + "</p>"
        // const ch_area_stat = await ch_area_stat(area_1);
        // socket.emit('start_cycle',ch_area_stat);
        
        //it can be done only with sending the object name because the server can get the 
        //bhv based on it
        socket.emit("start_cycle",final_animal.name)    
        // socket.emit('start_cycle',final_animal);

    })();
    // let area_animal = document.createElement("p");
    // alert(a_cycle_data);

})

// socket.on('animal_channel',animal =>{
//     output_animal.innerHTML= '<p><b>  animal is: ' + animal + '</b></p>';


// });
// to do!!!!!!!!!!!!!!!!!!!!!!!
socket.on('area_channel',data =>{
    // alert(data.area+ " "+ area_1.getAttribute("id"))

    if(area_1.getAttribute("id") === data.area){
        // alert("!!!")
        area_1.innerHTML = '<p>'+ data.action + '</p>'
    }
});




