//to do: Método lugaresLivres


window.onload = function() {
    loadParques();
}

async function loadParques() {
    let elemAside = document.getElementById("listaParques");
    try {
        let parques = await $.ajax({
            url: "/api/parques",
            method: "get",
            dataType: "json"
        });
        let html ="";
        let tipo = "";
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
               coordenada1 = parque.Latitude;
               coordenada2 = parque.Longitude;
                html += "<button class='button button1' id = 'parque' onclick='selecionarParque("+coordenada1+","+ coordenada2 +","+parque.ParqueID+","+parque.LugaresPrioritarios+",\""+parque.Tipologia+"\","+parque.ClassificacaoMedia+")'><h1>"+parque.Nome+"</h1>"+
            "<p> Lugares Totais: "+parque.lugaresTotal+"</p>" + 
            //"<p style='color:#006622;'> Lugares Totais: "+parque.lugaresLivres+"</p>"+
            "<p> Preço diário: "+parque.precoDiario+"€</p></button>";
            console.log(parque.Tipologia);
        }

    }
        elemAside.innerHTML = html;
    } catch(err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
} 

async function loadReviews(PID, LP, tipo, CM) {
    let elemAside = document.getElementById("aside");
    try {
        let reviews = await $.ajax({
            url: "/api/parques/"+PID,
            method: "get",
            dataType: "json"
        });
        let html ="";
        html += "<h2> Lugares Prioritários: "+LP+"<br> Tipologia: "+tipo+"<br> Classificacao media: "+CM+"<br><br>Reviews do parque selecionado:<br>";
        for (let review of reviews) {
                html += "<section> <h2>"+review.Nome+":<br></h2>"+
                "<p> Comentario: "+review.Comentario+"<br> classificação: "+review.Classificacao+" Estrelas. <br><br></p></review>";
    }
        elemAside.innerHTML = html;

    } catch(err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
}

function selecionarParque(long, lat, ParqueID, LP, tipo, CM) {
    loadReviews(ParqueID, LP, tipo, CM);
    parquesMarkers(long, lat);
    //let html = "" + descricao;
    document.getElementById("description").innerHTML = "<h1> Informações do parque selecionado: <br> </h1>";
  }