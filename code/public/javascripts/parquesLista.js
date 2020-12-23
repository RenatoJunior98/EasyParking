//to do: Método lugaresLivres


window.onload = function() {
    loadParques();
}

async function loadParques() {
    let elemAside = document.getElementById("aside");
    try {
        let parques = await $.ajax({
            url: "/api/parques",
            method: "get",
            dataType: "json"
        });
        let html =""
        for (let parque of parques) {
            if(parque.lugaresLivres==0){
                html += "<button class='button button1' id = 'parque'>" +
                "<h1>" + parque.Nome+"</h1>"+
            "<p> Lugares Totais: "+parque.lugaresTotal+"</p>" + 
            //"<p style='color:#660000;'> Lugares Totais: "+parque.lugaresLivres+"</p>"+
            "<p> Preço diário: "+parque.precoDiario+"€</p>" +
            "</button>"
              }
              else {
               let loc= parque.Localizacao.split(",", 1);
               let aux = loc + ",";
               let locc = parque.Localizacao.replace(aux, '');
               coordenada1 = parseFloat(loc);
               coordenada2 = parseFloat(locc);
                html += "<button class='button button1' id = 'parque' onclick='selecionarParque("+coordenada1+","+ coordenada2 +")'><h1>"+parque.Nome+"</h1>"+
            "<p> Lugares Totais: "+parque.lugaresTotal+"</p>" + 
            //"<p style='color:#006622;'> Lugares Totais: "+parque.lugaresLivres+"</p>"+
            "<p> Preço diário: "+parque.precoDiario+"€</p></button>";
        }

    }
        elemAside.innerHTML = html;

    } catch(err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
} 
function selecionarParque(loc, locc) {
    parquesMarkers(loc, locc);
    //let html = "" + descricao;
    document.getElementById("description").innerHTML = "Informações do parque selecionado...";
  }