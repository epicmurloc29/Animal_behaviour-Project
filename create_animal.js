let fs         = require('fs');
let animalpath       = __dirname + '/animal.txt';
let bvpath           = __dirname + '/behaviour.txt';
let a_content   = fs.readFileSync(animalpath, 'utf8')  
    .trim()
    .split(/[\s,]+/);
//************************
let type   = a_content.filter(e =>{
    if(e === 'mammal' || e === 'bird' || e === 'fish' || e === 'rodent'){
        return e;
    }
    
});
let animal =  a_content.filter(e =>{
    if(e !== 'mammal' && e !== 'bird' && e !== 'fish' && e !== 'rodent'){
        return e;
    }
    
});

// console.log(animal);
// console.log(type); 
//************************   
let b_content   = fs.readFileSync(bvpath, 'utf8')
    .trim()
    .split('\n');
//****************** */
//  console.log(b_content); 


let a_array = [];
let populate = (animal,action) =>{  
    animal.forEach(element => {
        let obj = {};
        let i = animal.indexOf(element);
        obj.name = element;
        if(type[i] === 'mammal' || type[i] ==='rodent'){
             obj.action = action.filter(e =>{
                if(e !== 'swimm' && e!== 'fly'){
                    return e;
                }

             });
        
         a_array.push(obj);   
        }else if(type[i] === 'bird'){
            obj.action = action.filter(e =>{
                if(e !== 'swimm'){
                    // console.log(e)
                    return e;
                }    
            });
         a_array.push(obj);  
        }else if(type[i] === 'fish') {
            obj.action = action.filter(e =>{
                if(e !== 'fly'){
                    // console.log('ajunge aici2')
                    return e;
                }

             });
        a_array.push(obj);
        }     
    });

    return a_array;

}
let animals =  populate(animal,b_content);
console.log(animals);
//********************************* */
let ajson = JSON.stringify(animals,null,2);
fs.writeFileSync(__dirname+'/animals.json',ajson, 'utf8');

exports.animals = animals;

//  console.log(a_content);
// console.log(a_content);
// console.log(a_array);


