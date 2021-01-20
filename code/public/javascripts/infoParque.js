
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
    let htmlAtalhos = "";
    let htmlNome = "";
    let htmlInfo = "";
    let htmlClassificacao = "";
    sessionStorage.setItem("parqueID", parqueInfo.ParqueID);
    htmlAtalhos += "<a><button class='material-icons direction-icon'>directions</button></a>  <a><button onclick='getEmel("+ JSON.stringify(parqueInfo.Nome) +")' class='material-icons emel-icon'>info</button></a>  <a><button class='material-icons share-icon'>share</button></a>  <a><button class='material-icons bookmark-icon'>bookmark_border</button></a>"

    htmlNome += "<h1>" + parqueInfo.Nome + "</h1>";

    htmlInfo += "<br><p><span style='color: #FF5F00'>Morada: </span>" + parqueInfo.Descricao +
        "</p></br>   <br><p><span style='color: #FF5F00'>GPS: </span>" + parqueInfo.Latitude + ", " + parqueInfo.Longitude +
        "</p></br>   <br><p><span style='color: #FF5F00'>Tipologia: </span>" + parqueInfo.Tipologia +
        "</p></br>   <br><p><span style='color: #FF5F00'>Número de Lugares: </span>" + parqueInfo.LugaresTotal +
        "</p></br>   <br><p><span style='color: #FF5F00'>Número de Lugares: </span>" + parqueInfo.LugaresTotal +
        "</p></br>   <br><p><span style='color: #FF5F00'>Número de Lugares para Deficientes: </span>" + parqueInfo.LugaresPrioritarios + "</p></br>";
    parquesMarkers(parqueInfo.Latitude, parqueInfo.Longitude, parqueInfo.Nome);

    htmlClassificacao += "<h1 class='classificacao'>" + parqueInfo.ClassificacaoMedia + "</h1>"

    elemAtalhos.innerHTML = htmlAtalhos;
    elemNome.innerHTML = htmlNome;
    elemInfo.innerHTML = htmlInfo;
    elemClassificacao.innerHTML = htmlClassificacao;

}

//retirado e alterado de: https://www.etnassoft.com/2011/03/03/eliminar-tildes-con-javascript/
var normalize = (function() {
    var from = "ABCDEFGHIJKLMNOPQRSTUVWXYZÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç ", 
        to   = "abcdefghijklmnopqrstuvwxyzaaaaaeeeeiiiioooouuuuaaaaaeeeeiiiioooouuuunncc-",
        mapping = {};
   
    for(var i = 0, j = from.length; i < j; i++ )
        mapping[ from.charAt( i ) ] = to.charAt( i );
   
    return function( str ) {
        var ret = [];
        for( var i = 0, j = str.length; i < j; i++ ) {
            var c = str.charAt( i );
            if( mapping.hasOwnProperty( str.charAt( i ) ) )
                ret.push( mapping[ c ] );
            else
                ret.push( c );
        }
        return ret.join( '' );
    }
   
})();

function getEmel(nome){
    window.open("https://www.emel.pt/pt/parques/"+ normalize(nome));
    console.log(normalize(nome));
}

async function loadReviews() {
    let elemAside = document.getElementById("reviews");
    try {
        let reviews = await $.ajax({
            url: "/api/reviews/" + sessionStorage.getItem("parqueID"),
            method: "get",
            dataType: "json"
        });
        //sessionStorage.setItem("reviews",JSON.stringify(reviews)); 
        return reviews;
    } catch (err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}

async function showReviews() {
    // let parqueID = sessionStorage.getItem("parqueID");
    // console.log(parqueID)
    let reviews = await loadReviews();
    //let reviews = JSON.parse(sessionStorage.getItem("reviews"));
    let elemReviews = document.getElementById("reviews");
    let html = "";
    for (let review of reviews) {
        html += "<section class='review'><h1>" + review.Nome + "</h1><p>" + review.Comentario + "</p><p> Classificação: " + review.Classificacao + "</section>";


    }
    if (reviews.length == 0)
        html += "<section class='review'><h1> O parque selecionado ainda não tem reviews</h1></section>";
    elemReviews.innerHTML = html;

}