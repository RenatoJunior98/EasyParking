
window.onload = function() {
    loadParques();
}

async function loadParques() {
    let elemMain = document.getElementById("aside");
    try {
        let parques = await $.ajax({
            url: "/api/parques",
            method: "get",
            dataType: "json"
        });
        let html ="";
        for (let parque of parques) {
            html += "<section><h1>"+parque.Nome+"</h1>"+
            "<p> Lugares Totais: "+parque.lugaresTotal+"</p>" + 
            "<p> Preço diário "+parque.precoDiario+"</p></section>";
        }
        elemMain.innerHTML = html;

    } catch(err) {
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
} 


// //[nome do parque, lugares disponíveis, preco diário]
// var parque1 = ["Parque do Marquês de Pombal", 57, 10]; 
// var parque2 = ["Parque do Hospital da Luz", 0, 15]; 
// //var parque3 = [query];
// var parques = [parque1, parque2];


// var units = [parque1, parque2];

// function validation(object) {
//     let aux = '';
//     if (object[2] < 9.5){
//         aux = 'class = "failed"';
//     }
//     return aux;
// }

// function unit(n){ // returns an object's array from the array of units.
//     for (let i = 0; i < units.length; i++){
//         aux = units[i];
//         if (n == i){
//             return aux;
//         }
//     }
// }

// function unitSlot(object) { // returns all unit squares with their information for main tag.
//     sum = "";
//     for (let i = 0; i < object.length; i++){
//     aux = unit(i);
//     icon = aux[0].substring(0, 2);
//     slot =
//     '<section '+validation(aux)+'class = "gradingSections">'+'<section id="top-of-slot"><h1 id="icon">'+icon+'</h1><section id="aside"><h1>'+aux[0]+'</h1>'+'<p>Grade: '+aux[1]+'</p></section></section><section id="bottom-of-slot"><p>Semester: '+aux[2]+'</p><p>ETCS: '+aux[3]+'</p></section></section>';
//     sum = sum + slot;
//     }
//     return sum;
    
// }

// window.onload =  function () {

//     document.getElementById('aside');
//     grades.innerHTML = unitSlot(units);


//     failed = 0;
//     passed = 0;
//     sum = 0;
//     for (let i = 0; i < units.length; i++){
//         aux = unit(i);
//         if (aux[2]< 9.5){
//             sum = sum;
//             failed++;
//         } else {
//         sum = sum + aux[2];
//         passed++;
//         }
//     }

//     average = 0;
//     average = sum / passed;
// }