
window.onload = function () {
    showInfo();
    showReviews();
}

async function loadInfo() {
    //parquesMarkers(long, lat);
    let parqueID = await sessionStorage.getItem("parqueID");
    console.log(parqueID);
    try {
        let parques = await $.ajax({
            url: "/api/parques",
            method: "get",
            dataType: "json"
        });
        for (let parque of parques) {
            console.log(parque);
            if (parqueID == parque.ParqueID) {
                return parque;
            }
        }
    } catch (err) {
        console.log(err);
    }
}


async function showInfo() {
    let parqueInfo = await loadInfo();
    let elemAtalhos = document.getElementById("atalhos");
    let elemNome = document.getElementById("nomeParque");
    let elemInfo = document.getElementById("info");
    let elemClassificacao = document.getElementById("classificacao");
    parquesMarkers(parqueInfo.Latitude, parqueInfo.Longitude, parqueInfo.Nome);
    let htmlAtalhos = "";
    let htmlNome = "";
    let htmlInfo = "";
    let htmlClassificacao = "";
    //sessionStorage.setItem("parqueID", parqueInfo.ParqueID);
    console.log(parqueInfo);
    htmlAtalhos += "<a><button class='material-icons direction-icon'>directions</button></a>  <a><button onclick='getEmel(" + JSON.stringify(parqueInfo.Nome) + ")' class='material-icons emel-icon'>info</button></a>  <a><button class='material-icons share-icon'>share</button></a>  <a><button class='material-icons bookmark-icon'>bookmark_border</button></a>"
    htmlNome += "<h1>" + parqueInfo.Nome + "</h1> <input type='button' class='buttonLugares' value='+' onclick = 'mudaLugaresDisponiveis(1, " + parqueInfo.LugaresTotal + ")'></input> <input type='button' class='buttonLugares' value='-'' onclick = 'mudaLugaresDisponiveis(-1, " + parqueInfo.LugaresTotal + ")'></input>";
    htmlInfo += "<br><p><span style='color: #FF5F00'>Morada: </span>" + parqueInfo.Descricao +
        "</p></br>   <br><p><span style='color: #FF5F00'>GPS: </span>" + parqueInfo.Latitude + ", " + parqueInfo.Longitude +
        "</p></br>   <br><p><span style='color: #FF5F00'>Tipologia: </span>" + parqueInfo.Tipologia +
        "</p></br>   <br><p><span style='color: #FF5F00'>Número de Lugares totais: </span>" + parqueInfo.LugaresTotal +
        "</p></br>   <br><p><span style='color: #FF5F00'>Número de Lugares disponiveis: </span>" + parqueInfo.LugaresDisponiveis +
        "</p></br>   <br><p><span style='color: #FF5F00'>Número de Lugares para Deficientes: </span>" + parqueInfo.LugaresPrioritarios +
        "</p></br>   <input onclick='fazerReserva()'' type='button' class='buttonReview' value='FAZER RESERVA'>";
    //parquesMarkers(parqueInfo.Latitude, parqueInfo.Longitude, parqueInfo.Nome);

    htmlClassificacao += "<h1 class='classificacao'>" + parqueInfo.ClassificacaoMedia + "</h1>"

    elemAtalhos.innerHTML = htmlAtalhos;
    elemNome.innerHTML = htmlNome;
    elemInfo.innerHTML = htmlInfo;
    elemClassificacao.innerHTML = htmlClassificacao;
    if (sessionStorage.getItem("userID") !== null) {
        let nomeAside = document.getElementById("iconNome");
        nomeAside.innerHTML = "<a id='nomeUser'> " + sessionStorage.getItem("nome") + "</a>";
        let buttonAside = document.getElementById("sairButton");
        buttonAside.innerHTML = "<input type='button' class='sairB' id='logOutB' value='Log Out' onClick='logOut()'></input>"
    }
}

async function logOut() {
    await sessionStorage.removeItem("userID");
    await sessionStorage.removeItem("nome");
    window.location = "infoParque.html";
}


//retirado e alterado de: https://www.etnassoft.com/2011/03/03/eliminar-tildes-con-javascript/
var normalize = (function () {
    var from = "ABCDEFGHIJKLMNOPQRSTUVWXYZÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç -",
        to = "abcdefghijklmnopqrstuvwxyzaaaaaeeeeiiiioooouuuuaaaaaeeeeiiiioooouuuunncc-",
        mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
        var ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        return ret.join('');
    }

})();

function getEmel(nome) {
    window.open("https://www.emel.pt/pt/parques/" + normalize(nome));
    console.log(normalize(nome));
}

async function loadReviews() {
    let elemAside = document.getElementById("reviews");
    console.log(sessionStorage.getItem("parqueID"));
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

async function loadLugaresDisponiveis() {
    try {
        let lugares = await $.ajax({
            url: "/api/parques/" + sessionStorage.getItem("parqueID"),
            method: "get",
            dataType: "json"
        });
        console.log(lugares[0].LugaresDisponiveis);
        return lugares[0].LugaresDisponiveis;
    } catch (err) {
        console.log(err);
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
    console.log(loadLugaresDisponiveis());

}


async function mudaLugaresDisponiveis(valor, total) {
    console.log(valor);
    let lugares = await loadLugaresDisponiveis()
    console.log(lugares);
    lugares += valor;
    if (lugares < 0) {
        swal("0 lugares disponiveis!", "");
        window.location = ("infoParque.html");
    }
    else if (lugares > total) {
        swal("parque lotado!", "");
        window.location = ("infoParque.html");
    }
    else {
        try {
            let result = await $.ajax({
                url: "/api/parques/lugares/" + lugares + "/" + sessionStorage.getItem("parqueID"),
                method: "post",
                dataType: "json",
            });
            window.location = ("infoParque.html");
        } catch (err) {
            console.log(err);
            // mensagem para o utilizador
        }
    }
}
