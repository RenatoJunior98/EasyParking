
window.onload = function () {
    showInfo();
    showReviews();
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
    let elemAtalhos = document.getElementById("atalhos");
    let elemNome = document.getElementById("nomeParque");
    let elemInfo = document.getElementById("info");
    let elemClassificacao = document.getElementById("classificacao");
    let htmlAtalhos= "";
    let htmlNome= "";
    let htmlInfo= "";
    let htmlClassificacao= "";
    sessionStorage.setItem("parqueID", parqueInfo.ParqueID);
        htmlAtalhos += "<a><button class='material-icons direction-icon'>directions</button></a>  <a><button class='material-icons emel-icon'>info</button></a>  <a><button class='material-icons share-icon'>share</button></a>  <a><button class='material-icons bookmark-icon'>bookmark_border</button></a>"
    
        htmlNome += "<h1>" + parqueInfo.Nome + "</h1>";
        
        htmlInfo += "<br><p><span style='color: #FF5F00'>Morada: </span>" + parqueInfo.Descricao + 
        "</p></br>   <br><p><span style='color: #FF5F00'>GPS: </span>"+ parqueInfo.Latitude +","+ parqueInfo.Longitude + 
        "</p></br>   <br><p><span style='color: #FF5F00'>Tipologia: </span>"+ parqueInfo.Tipologia +
        "</p></br>   <br><p><span style='color: #FF5F00'>Número de Lugares: </span>"+ parqueInfo.LugaresTotal +
        "</p></br>   <br><p><span style='color: #FF5F00'>Número de Lugares para Deficientes: </span>"+ parqueInfo.LugaresPrioritarios +"</p></br>";
        
        htmlClassificacao += "<h1 class='classificacao'>"+ parqueInfo.ClassificacaoMedia +"</h1>"

elemAtalhos.innerHTML = htmlAtalhos;
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
        html += "<section class='review'><h1>" + review.Nome + "</h1><p>" + review.Comentario + "</p><p> Classificação: "+ review.Classificacao +"</section>";
}
elemReviews.innerHTML = html;
}