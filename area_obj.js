//status processing
//id 0 for empty, 1 for full
let up_area_stat = (arr) =>{
    return new Promise(resolve =>{
        let l = arr.length;
        let default_area = [
            {area_1: 0},
            {area_2: 0},
            {area_3: 0}
        ]    

//object.keys() folosit pentru a te juca cu proprietatile unui obiect!!!
//object.values() returneaza doar valorile proprietatilor intr=un array!!!!
        for(let i = 0;i<l;i++){
        //   console.log(Object.values(area_status_p[i])[0]) 
        //   Object.values(area_status_p[i])[0] = arr[i]; 
            // let el = arr[i];
            Object.keys(default_area[i]).forEach(key =>{
                default_area[i][key] = arr[i];
            })    
        }

        let empty_area = get_property(0,default_area);
        let full_area  = get_property(1,default_area);
        
        resolve(
                { full_area,
                  empty_area  
                } = {full_area,empty_area}

        );
        
                });
}

let get_property = ((byte,df_area)=>{
    area_array = [];
    area_filtered = df_area.filter(e =>{
        if(Object.values(e)[0] === byte){
            return e;
        }

    });
    area_filtered.forEach(e =>{
        //using join() instead of reduce to get strings to return area strings
        area_string = Object.getOwnPropertyNames(e).join(',');
        // area_array.push(Object.getOwnPropertyNames(e));
        area_array.push(area_string);
    })
    return area_array;

});

// console.log(area_status.change);


//TESTING AREA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

// let a = [0,1,1]      
//         up_area_stat(a).then(data =>{
//                 console.log(data);  
//             });      
            
            // console.log(empty_area);
// let arrr = [1,2];
// let filler1 = (([a,b]) =>{
//     console.log([a,b])

// });
// filler1(arrr);

//GOOD TEST
// let arr_test = [1,1,0];

// let area_status3 = [
//     {area_1: 1},
//     {area_2: 0},
//     {area_3: 0}

// ]

// area_status3.forEach(obj => {
//     /* 'obj' = each object in 'arrayOfObjects' */
//     Object.keys(obj).forEach(key=> {
//         /* 'key' = each key in 'obj' */
//         obj[key] = 1;
//         // if (obj[key] === '') delete obj[key];
//     });
// });

//GARBAJE
// console.log(area_status3)
// let n = Object.values(area_status3[0]).splice();

// console.log(n)
// let filler = area_status3.filter(e=>{
//     if(Object.values(e)[0] === 0){
//         return e;
//     }
// })
// console.log(filler)
// console.log(Object.values({area_1:0}))

exports.up_area_stat = up_area_stat;
