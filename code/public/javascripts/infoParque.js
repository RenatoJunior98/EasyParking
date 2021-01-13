
window.onload = function () {
    showInfo();
    showReviews()
}

// async function loadInfo() {
//     parquesMarkers(long, lat);
//     let elemAside = document.getElementById("info");
//     let parqueID = sessionStorage.getItem( "parqueID");
//     try {
//         let info = await $.ajax({
//             url: "/api/parques/" + parqueID,
//             method: "get",
//             dataType: "json"
//         });
//         showInfo(info);
//         elemAside.innerHTML = html;
//     } catch (err) {
//         console.log(err);
//         elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
//             "<h2> Por favor tente mais tarde</h2>";
//     }
// }

function showInfo() {
    let parqueInfo = JSON.parse(sessionStorage.getItem("parque"));
    let elemNome = document.getElementById("nomeParque");
    let elemInfo = document.getElementById("info");
    let elemClassificacao = document.getElementById("classificacao");
    let elemReviews = document.getElementById("review");
    let htmlNome= "";
    let htmlInfo= "";
    let htmlClassificacao= "";
    sessionStorage.setItem("parqueID", parqueInfo.ParqueID);
        htmlNome += "<h1>" + parqueInfo.Nome + "</h1>";
        
        htmlInfo += "<p>Morada: " + parqueInfo.Descricao + 
        "</p> <p>GPS: "+ parqueInfo.Latitude +","+ parqueInfo.Longitude + 
        "</p> <p>Tipologia: "+ parqueInfo.Tipologia +
        "</p> <p>Número de Lugares: "+ parqueInfo.LugaresTotal +
        "</p> <p>Número de Lugares para Deficientes: "+ parqueInfo.LugaresPrioritarios +"</p>";
        
        htmlClassificacao += "<h1 class='classificacao'>"+ parqueInfo.ClassificacaoMedia +"</h1>"

elemNome.innerHTML = htmlNome;
elemInfo.innerHTML = htmlInfo;
elemClassificacao.innerHTML = htmlClassificacao;
}

function showReviews(){
    let parqueID = sessionStorage.getItem("parqueID");
    let reviews = JSON.parse(sessionStorage.getItem("reviews"));
    loadReviews(parqueID);
    let elemReviews = document.getElementById("reviews");
    let html = "";
    for (let review of reviews) {
        html += "<h1>" + review.Nome + "</h1><p>" + review.Comentario + "</p><p> Classificação: "+ review.Classificacao;
}
elemReviews.innerHTML = html;
}