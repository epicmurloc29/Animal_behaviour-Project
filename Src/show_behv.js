//let animals = require(__dirname+'/create_animal.js').animals;
// let animalj  = require(__dirname+'/animals.json');
let socket = io.connect('http://localhost:3000/');
let output_animal = document.getElementById('output_animal');
let getAnimals = document.getElementById('getAnimals');
let output_animal_test = document.getElementById('receive_animals');
let animalx = document.getElementById('animalx');
let spanx = document.getElementById('spanx');
// let animalspan = document.getElementById('animalspan');



// socket.on('one',data =>{
    
    //     document.write(data);
    
    // })
    // *************************************************
    
    
getAnimals.addEventListener("click",() =>{
    let animalflag = true;
         alert("animal request sent!");
        socket.emit('getanimal_ch',animalflag);
    });

// animalspan.addEventListener("click", ()=>{
//          alert("hello!");
// })

// spanx.onclick(()=>{
//     alert("hello");
// });
// spanx.addEventListener("click",()=>{
//     alert("hello!");
// });


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
// socket.on('animal_channel',animal =>{
//     output_animal.innerHTML= '<p><b>  animal is: ' + animal + '</b></p>';


// });






