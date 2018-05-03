// document.write('asdasdasdasd');
let socket = io.connect('http://localhost:3000/');
let output = document.getElementById('output');
let output2 = document.getElementById('output2');
let date1   = document.getElementById('date1');



socket.on('data1',data =>{    //asculta pe canalul data1
    //  document.write(data);
     output.innerHTML += '<p>' + data + '</p>';
    //  console.log(data);

});
socket.on('data2',data =>{    //asculta pe canalul data1
    //  document.write(data);
    data.forEach(data_e => {
            let el = document.createTextNode(data_e);
            // output.innerHTML += '<p>' + data_e + '</p>';
            output2.appendChild(el);
       
        
    });

});

socket.on('date',data =>{
    
    output.innerHTML = '<p>date is: ' + data + '</p>';

});




