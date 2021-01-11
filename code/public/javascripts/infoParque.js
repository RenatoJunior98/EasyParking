

async function loadInfo(PID, LP, tipo, CM, long, lat) {
    parquesMarkers(long, lat);
    let elemAside = document.getElementById("info");
    sessionStorage.setItem( "parqueID", PID);
    try {
        let reviews = await $.ajax({
            url: "/api/parques/" + PID,
            method: "get",
            dataType: "json"
        });
        let html = "";
        let userID = 0;
        html += "<h2> Lugares Prioritários: " + LP + "<br> Tipologia: " + tipo + "<br> Classificacao media: " + CM + "<br><br>Reviews do parque selecionado:<br>";
        // for (let review of reviews) {
        //     html += "<section> <h2>" + review.Nome + ":<br></h2>" +
        //         "<p> Comentario: " + review.Comentario + "<br> classificação: " + review.Classificacao + " Estrelas. <br><br></p></review>";
        //     userID = review.UserID;
        // }
        elemAside.innerHTML = html;
    } catch (err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}
