
window.onload = function () {
  showInfo();
  showReviews();
}
async function loadInfo() {
  var d = new Date();
  let parqueID = await sessionStorage.getItem("parqueID");
  try {
    let parques = await $.ajax({
      url: "/api/parques",
      method: "get",
      dataType: "json"
    });
    for (let parque of parques) {
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
  let elemDate = document.getElementById("date");
  //parquesMarkers(parqueInfo.Latitude, parqueInfo.Longitude, parqueInfo.Nome);
  parquesMarkersInfo(parqueInfo.Latitude, parqueInfo.Longitude);
  let htmlAtalhos = "";
  let htmlNome = "";
  let htmlInfo = "";
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  //https://flaviocopes.com/how-to-get-tomorrow-date-javascript/
  const today = new Date()
  const date = new Date(today)
  date.setDate(date.getDate() + 1)
  //https://www.geeksforgeeks.org/javascript-date-toisostring-method/
  let dateString = date.toISOString().replaceAll("/", "-");
  console.log(dateString.substring(0,10));
  let htmlDate = "<label for='data'>Escolha o dia para a sua reserva</label> <input type='date' id='data' name='data' min= '" + dateString.substring(0,10) + "'>";
  //sessionStorage.setItem("parqueID", parqueInfo.ParqueID);
  htmlAtalhos += "<a><button class='material-icons direction-icon'>directions</button></a>  <a><button onclick='getEmel(" + JSON.stringify(parqueInfo.Nome) + ")' class='material-icons emel-icon'>info</button></a>  <a><button class='material-icons share-icon'>share</button></a>  <a><button class='material-icons bookmark-icon'>bookmark_border</button></a>"
  htmlNome += "<h1>" + parqueInfo.Nome + "</h1> <input type='button' class='buttonLugares' value='+' onclick = 'mudaLugaresDisponiveis(1)'></input> <input type='button' class='buttonLugares' value='-'' onclick = 'mudaLugaresDisponiveis(-1)'></input>";
  htmlInfo += "<br><p><span style='color: #FF5F00'>Morada: </span>" + parqueInfo.Descricao +
    "</p></br>   <br><p><span style='color: #FF5F00'>GPS: </span>" + parqueInfo.Latitude + ", " + parqueInfo.Longitude +
    "</p></br>   <br><p><span style='color: #FF5F00'>Tipologia: </span>" + parqueInfo.Tipologia +
    "</p></br>   <br><p><span style='color: #FF5F00'>Número de Lugares totais: </span>" + parqueInfo.LugaresTotal +
    "</p></br>   <br><p><span style='color: #FF5F00'>Número de Lugares disponiveis: </span>" + parqueInfo.LugaresDisponiveis +
    "</p></br>   <br><p><span style='color: #FF5F00'>Número de Lugares para Deficientes: </span>" + parqueInfo.LugaresPrioritarios + "</p>";

  elemAtalhos.innerHTML = htmlAtalhos;
  elemNome.innerHTML = htmlNome;
  elemInfo.innerHTML = htmlInfo;
  elemDate.innerHTML = htmlDate;
  getDirerecoes(parqueInfo.Latitude, parqueInfo.Longitude);
  if (sessionStorage.getItem("userID") !== null) {
    let nomeAside = document.getElementById("iconNome");
    nomeAside.innerHTML = "<a id='nomeUser'> " + sessionStorage.getItem("nome") + "</a>";
    let buttonAside = document.getElementById("sairButton");
    buttonAside.innerHTML = "<input type='button' class='sairB' id='logOutB' value='Log Out' onClick='logOut()'></input>"
  }
}


async function showReviews() {
  // let parqueID = sessionStorage.getItem("parqueID");
  // console.log(parqueID)
  let classificacaoSum = 0;
  let classificacaoMedia = 0;
  let reviews = await loadReviews();
  //let reviews = JSON.parse(sessionStorage.getItem("reviews"));
  let elemReviews = document.getElementById("reviews");
  let elemClassificacao = document.getElementById("classificacao");
  let html = "";
  let htmlClassificacao = "";
  for (let review of reviews) {
    html += "<section class='review'><h1>" + review.Nome + " ★" + review.Classificacao + "</h1><p>" + review.Comentario + "</section>";
    classificacaoSum += review.Classificacao;
  }
  if (classificacaoSum > 0) {
    classificacaoMedia = (classificacaoSum / reviews.length).toFixed(1);
    htmlClassificacao += "<h1 class='classificacao'>" + classificacaoMedia + "☆</h1>";
  }
  else
    htmlClassificacao += "<h1 class='classificacao'> N/A </h1>";
  if (reviews.length == 0)
    html += "<section class='review'><h1> O parque selecionado ainda não tem reviews</h1></section>";
  elemReviews.innerHTML = html;
  elemClassificacao.innerHTML = htmlClassificacao;
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


async function logOut() {
  await sessionStorage.removeItem("userID");
  await sessionStorage.removeItem("nome");
  window.location = "infoParque.html";
}

function reservasLogin() {
  if (sessionStorage.getItem("userID") !== null){
      window.location = "reserva.html"
  }
  else {
      window.location = "iniciarSessao.html"
  }

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

async function loadLugaresDisponiveis() {
  try {
    let lugares = await $.ajax({
      url: "/api/parques/" + sessionStorage.getItem("parqueID"),
      method: "get",
      dataType: "json"
    });
    return lugares;
  } catch (err) {
    console.log(err);
  }
}


async function mudaLugaresDisponiveis(valor) {
  let lugares = await loadLugaresDisponiveis();
  lugaresDisponiveis = lugares[0].LugaresDisponiveis;
  lugaresDisponiveis += valor;
  if (lugaresDisponiveis < 0) {
    swal("0 lugares disponiveis!", "");
    window.location = ("infoParque.html");
  }
  else if (lugaresDisponiveis > lugares[0].LugaresTotal) {
    swal("parque lotado!", "");
    window.location = ("infoParque.html");
  }
  else {
    try {
      let result = await $.ajax({
        url: "/api/parques/lugares/" + lugaresDisponiveis + "/" + sessionStorage.getItem("parqueID"),
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

//revervas


function verificarLoginReserva() {
  if (sessionStorage.getItem("userID") == null)
    swal("Inicie sessão para poder fazer uma reserva");
  else {
    if (confirmaReserva() == true)
      addReserva();
  }
}
async function confirmaReserva() {
  swal({
    title: "Confirmação de reserva",
    icon: "info",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal("A reserva foi feita com sucesso!", {
          icon: "success",
        });
        addReserva();
      }
    });
}

function getCodigo() {
  var codigo = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789";
  let valido = true;
  while (valido == true) {
    for (var i = 0; i < 9; i++) {
      codigo += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    valido = checkCodigo(codigo);
  }
  return codigo;
}


async function checkCodigo(codigo) {
  try {
    let dados = await $.ajax({
      url: "/api/reserva/" + codigo,
      method: "get",
      dataType: "json"
    });
    if (dados.length == 0) {
      return true;
    }
    else
      return false;
  }
  catch (err) {
    console.log(err);
  }
}


async function addReserva() {
  let parqueID = sessionStorage.getItem("parqueID");
  let userID = sessionStorage.getItem("userID");
  let reserva = {
    diaReserva: document.getElementById("data").value,
    parqueID: parqueID,
    userID: userID,
    codigo: getCodigo()
  }
  try {
    let codigo = await $.ajax({
      url: "/api/reserva",
      method: "post",
      dataType: "json",
      data: JSON.stringify(reserva),
      contentType: "application/json"
    });
  } catch (err) {
    console.log(err);
    // mensagem para o utilizador
  }
}

