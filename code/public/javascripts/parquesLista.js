var studentName = "John Smith";

// [nome do parque, lugares disponíveis, preco diário]
var parque1 = ["Parque do Marquês de Pombal", 57, 10]; 
var parque2 = ["Parque do Hospital da Luz", 0, 15]; 

var parques = [parque1, parque2];

function validation(object) {
    let aux = '';
    if (object[1] == 0){
        aux = 'class = "full"';
    }
    return aux;
}

function parque(n){ // returns an object's array from the array of parques.
    for (let i = 0; i < parques.length; i++){
        aux = parques[i];
        if (n == i){
            return aux;
        }
    }
}

function parqueSlot(object) { // returns all "parques" squares with their information for main tag.
    sum = "";
    for (let i = 0; i < object.length; i++){
    aux = parque(i);
    icon = aux[0].substring(0, 2);
    slot =
    '<section '+validation(aux)+'class = "parqueSections">'+'<section id="top-of-slot"><h1 id="icon">'+icon+'</h1><section id="precoDiario"><h1>'+aux[0]+'</h1>'+'<p>Grade: '+aux[1]+'</p></section></section><section id="bottom-of-slot"><p>Preço: '+aux[2]+'</p></section></section>';
    sum = sum + slot;
    }
    return sum;
}

window.onload =  function () {
   
    document.getElementById('student');
    student.innerText = studentName + " grades";

    document.getElementById('grades');
    grades.innerHTML = parqueSlot (parques);


    failed = 0;
    livres = 0;
    sum = 0;
    for (let i = 0; i < parques.length; i++){
        aux = parque(i);
        if (aux[1]< 9.5){
            sum = sum;
            full++;
        } else {
        sum = sum + aux[1];
        livres++;
        }
    }

    average = 0;
    average = livres / passed;

    document.getElementById('summary');
    summary.innerHTML = '<summary><b>Average: '+average.toFixed(1)+'</summary><p>'+full+' failed parques</p><p>'+livres+' passed parques</p></b>';
    
}