// [Unite, Grade, Semester, ETCS]
var mathematics = ["Mathematics", 9.2, "3º semester", "6 ETCS"]; 
var literature = ["Literature", 12.8, "2º semester", "6 ETCS"]; 
var laws = ["Laws", 13.5, "1º semester", "3 ETCS"]; 
var informatics = ["Informatics", 15.8, "1º semester", "6 ETCS"]; 
var cooking = ["Cooking", 6.7, "2º semester", "3 ETCS"]; 


var units = [mathematics, literature, laws, informatics, cooking];

function validation(object) {
    let aux = '';
    if (object[1] < 9.5){
        aux = 'class = "failed"';
    }
    return aux;
}

function unit(n){ // returns an object's array from the array of units.
    for (let i = 0; i < units.length; i++){
        aux = units[i];
        if (n == i){
            return aux;
        }
    }
}

function unitSlot(object) { // returns all unit squares with their information for main tag.
    sum = "";
    for (let i = 0; i < object.length; i++){
    aux = unit(i);
    icon = aux[0].substring(0, 2);
    slot =
    '<section '+validation(aux)+'class = "gradingSections">'+'<section id="top-of-slot"><h1 id="icon">'+icon+'</h1><section id="unit-grade"><h1>'+aux[0]+'</h1>'+'<p>Grade: '+aux[1]+'</p></section></section><section id="bottom-of-slot"><p>Semester: '+aux[2]+'</p><p>ETCS: '+aux[3]+'</p></section></section>';
    sum = sum + slot;
    }
    return sum;
    
}

window.onload =  function () {

    document.getElementById('grades');
    grades.innerHTML = unitSlot(units);


    failed = 0;
    passed = 0;
    sum = 0;
    for (let i = 0; i < units.length; i++){
        aux = unit(i);
        if (aux[1]< 9.5){
            sum = sum;
            failed++;
        } else {
        sum = sum + aux[1];
        passed++;
        }
    }

    average = 0;
    average = sum / passed;

    document.getElementById('summary');
    summary.innerHTML = '<summary><b>Average: '+average.toFixed(1)+'</summary><p>'+failed+' failed units</p><p>'+passed+' passed units</p></b>';
    
}