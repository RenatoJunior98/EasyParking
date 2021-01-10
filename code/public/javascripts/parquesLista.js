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
        html += "<button class='button button1' id = 'parque' onclick='selecionarParque(" + coordenada1 + "," + coordenada2 + "," + parque.ParqueID + "," + parque.LugaresPrioritarios + ",\"" + parque.Tipologia + "\"," + parque.ClassificacaoMedia + ")'><h1>" + parque.Nome + "</h1>" +
            "<p> Lugares Totais: " + parque.lugaresTotal + "</p>" +
            //"<p style='color:#006622;'> Lugares Totais: "+parque.lugaresLivres+"</p>"+
            "<p> Preço diário: " + parque.precoDiario + "€</p></button>";
    //}
}
elemAside.innerHTML = html;
}

async function loadReviews(PID, LP, tipo, CM) {
    let elemAside = document.getElementById("aside");
    try {
        let reviews = await $.ajax({
            url: "/api/parques/" + PID,
            method: "get",
            dataType: "json"
        });
        let html = "";
        let userID = 0;
        html += "<h2> Lugares Prioritários: " + LP + "<br> Tipologia: " + tipo + "<br> Classificacao media: " + CM + "<br><br>Reviews do parque selecionado:<br>";
        for (let review of reviews) {
            html += "<section> <h2>" + review.Nome + ":<br></h2>" +
                "<p> Comentario: " + review.Comentario + "<br> classificação: " + review.Classificacao + " Estrelas. <br><br></p></review>";
            userID = review.UserID;
        }
        elemAside.innerHTML = html;
    } catch (err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}

function selecionarParque(long, lat, ParqueID, LP, tipo, CM) {
    loadReviews(ParqueID, LP, tipo, CM);
    parquesMarkers(long, lat);
    //checkLogin(userID, ParqueID);
    //let html = "" + descricao;
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