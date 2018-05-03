// import { error } from "util";

let behaviours = require(__dirname+'/animals.json');

// console.log(behaviours);

// let get_behaviour = new Promise((resolve,reject)=>{
    
// })
let animal_dog = 'dog';

let get_behaviour = (animal) =>{
    return new Promise((resolve,reject)=>{
        let action_arr = [];
        let reduce_complete = false;
        let animal_reduced = behaviours.reduce((action_arr,object)=>{
            action_arr = action_arr || [];
            if(object.name === animal){
                // console.log(object.name);
                // console.log(object.action);

               action_arr = object.action;
               console.log(action_arr);
               
                }

                return action_arr;
            },[]);
            
        // let behaviour = animal_reduced.split();
            reduce_complete = true;
            console.log(animal_reduced);
            // console.log(action_arr);
            // console.log(action_arr.lenght);
            
        // try{
            // if(action_arr.lenght > 0){
            if(reduce_complete){
            console.log('ajunge la arr length');
            
            resolve(animal_reduced);
            }else{
                
                reject('this ' + animal + ' is not valid');

            }
        // }catch (err){
        
    });

};

// get_behaviour(animal_dog).then(data =>{
//     console.log(data);
// })

(async function get_promise(){
    // try{
        const actual_behaviour =  await get_behaviour(animal_dog);
        //  await get_behaviour(animal_dog);
        console.log(actual_behaviour);

    // }catch(err){
    //     return 'what the fuck';
    // }
    
})();
