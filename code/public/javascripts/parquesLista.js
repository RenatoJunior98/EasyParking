//to do: Método lugaresLivres


window.onload = function () {
    loadParques(null);
}

async function loadParques(parquesFiltrados) {
    let elemAside = document.getElementById("listaParques");
    if (parquesFiltrados){
        showParques(parquesFiltrados);
    }
    else{
    try {
        let parques = await $.ajax({
            url: "/api/parques",
            method: "get",
            dataType: "json"
        });
        showParques(parques);
    } catch (err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}
}

function showParques(parques) {
    let elemAside = document.getElementById("listaParques");
    let html = "";
    //if(parques){
    for (let parque of parques) {
        coordenada1 = parque.Latitude;
        coordenada2 = parque.Longitude;
        console.log(coordenada1);
      
        html += "<button class='button button1' id = 'parque' onclick='selecionarParque(" + JSON.stringify(parque) + ")'><h1>" + parque.Nome + "</h1>" +
            "<p> Lugares Totais: " + parque.LugaresTotal + "</p>" +
            //"<p style='color:#006622;'> Lugares Totais: "+parque.lugaresLivres+"</p>"+
            "<p> Preço diário: " + parque.precoDiario + "€</p></button>";
    //}
}
elemAside.innerHTML = html;
}


function selecionarParque(parque) {
    sessionStorage.removeItem("parque");
    sessionStorage.setItem("parque",JSON.stringify(parque));
   // showInfo(parque);
    window.open("infoParque.html","_self");
    //loadInfo(parque);
   
}


async function filtrar() {
    try {
        let Nome = document.getElementById("search").value;
        let parques = await $.ajax({
            url: "/api/parques?Nome=" + Nome,
            method: "get",
            dataType: "json"
        });
        loadParques(parques);
    } catch (err) {
        let elemAside = document.getElementById("listaParques");
        
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }


}