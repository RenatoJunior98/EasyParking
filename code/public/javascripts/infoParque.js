window.onload = function () {
  var parqueIDx = sessionStorage.getItem("parqueID");
  showInfo();
  showReviews(parqueIDx);
  if (sessionStorage.getItem("userID") !== null)
        loadNotificacoes();
}

async function loadInfo() {
  let parqueID = await sessionStorage.getItem("parqueID");
  try {
    let parques = await $.ajax({
      url: "/api/parques?parqueID=" + parqueID,
      method: "get",
      dataType: "json"
    });
    return parques[0];
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
  let htmlDate = "<label for='data'>Escolha o dia para a sua reserva</label> <input type='date' id='data' name='data' min= '" + dateString.substring(0, 10) + "'>";
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
  getDirecoes(parqueInfo.Latitude, parqueInfo.Longitude);
  if (sessionStorage.getItem("userID") !== null) {
    let nomeAside = document.getElementById("iconNome");
    nomeAside.innerHTML = "<a id='nomeUser'> " + sessionStorage.getItem("nome") + "</a>";
    let buttonReservasAside = document.getElementById("reservasButton");
    buttonReservasAside.innerHTML = "<input type='button' class='reservasB' value='Reservas' onclick='reservasLogin()'></input>";
    let buttonAside = document.getElementById("sairButton");
    buttonAside.innerHTML = "<input type='button' class='sairB' id='logOutB' value='Log Out' onClick='logOut()'></input>"
  }
}


async function showReviews(parqueIDx) {
  let reviewsClassificacao = await loadReviews(parqueIDx);
  let reviews = reviewsClassificacao.reviews;
  let elemReviews = document.getElementById("reviews");
  let elemClassificacao = document.getElementById("classificacao");
  let html = "";
  let htmlClassificacao = "";
  for (let review of reviews) {
    html += "<section class='review'><h1>" + review.Nome + " ★" + review.Classificacao + "</h1><p>" + review.Comentario + "</section>";
  }
  if (reviews.length == 0) {
    html += "<section class='review'><h1> O parque selecionado ainda não tem reviews</h1></section>";
    htmlClassificacao += "<h1 class='classificacao'> N/A </h1>";
  }
  else
    htmlClassificacao += "<h1 class='classificacao'>" + reviewsClassificacao.classificacaoMedia + "☆</h1>";
  elemReviews.innerHTML = html;
  elemClassificacao.innerHTML = htmlClassificacao;
}




async function logOut() {
  await sessionStorage.removeItem("userID");
  await sessionStorage.removeItem("nome");
  window.location = "infoParque.html";
}

function reservasLogin() {
  if (sessionStorage.getItem("userID") !== null) {
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


async function loadReviews(parqueIDx) {
  try {
    let reviews = await $.ajax({
      url: "/api/reviews/reviewsParque/" + parqueIDx,
      method: "get",
      dataType: "json"
    });
    return reviews;
  } catch (err) {
    console.log(err);
  }
}



async function mudaLugaresDisponiveis(valor) {
  try {
    let parqueObj = {
      parqueID: sessionStorage.getItem("parqueID"),
      valor: valor
    }
    let result = await $.ajax({
      url: "/api/parques/updateLugares/",
      method: "put",
      dataType: "json",
      data: JSON.stringify(parqueObj),
      contentType: "application/json"
    });
    window.location = ("infoParque.html");
  } catch (err) {
    console.log(err);
  }
}


function verificarLoginReserva() {
  if (sessionStorage.getItem("userID") == null)
    swal("Inicie sessão para poder fazer uma reserva", "");
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


async function addReserva() {
  let parqueID = sessionStorage.getItem("parqueID");
  let userID = sessionStorage.getItem("userID");
  let reserva = {
    diaReserva: document.getElementById("data").value,
    parqueID: parqueID,
    userID: userID
  }
  try {
    let novaReserva = await $.ajax({
      url: "/api/reservas/newBooking",
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

//notificações

function verNotificacoes() {
  var section = document.getElementById('notificacoes');
  if (section.style.display === 'block') {
      section.style.display = 'none';

  }
  else {
      section.style.display = 'block';
  }
}

async function showNotificacoes(reservas) {
  var section = document.getElementById('notificacoes');
  let html = "<section class='notificacoes'> <h2> Novas notificações: </h2>";
  let verNotificacoesAside = document.getElementById("verNotificacoesB");
  verNotificacoesAside.innerHTML = "<input type='button' id='verNotificacoesB' class='verNotificacoesB' onclick='verNotificacoes()' value='🕭 " + reservas.reservasCount + "'></input>";
  console.log(JSON.stringify(reservas.reservas));
  for (let reserva of reservas.reservas) {
      if (reserva.Estado == "Em espera")
          html += "<section class='sectionNotificacao'> <input type='button' class='apagarNotificacao' value='✘' onclick='fecharNotificacao("+reserva.ReservaID+")' > "+
          "<h3>"+  reserva.Nome  +"</h3>"+
          "<p> Tem uma reserva " + reserva.Estado + " no dia: " + reserva.DiaReserva + "</p> </section>";
      if (reserva.Estado == "Ativa")
          html += "<section class='sectionNotificacao'> <input type='button' class='apagarNotificacao' value='✘' onclick='fecharNotificacao("+reserva.ReservaID+")' > "+
          "<h3>"+  reserva.Nome  +"</h3>"+
          "<p> Tem uma reserva " + reserva.Estado + " para hoje </p>"+ 
          "<p> Código: "+ reserva.Codigo +"</section>";
  }
  html += "</section>"
  section.innerHTML = html;
}


async function loadNotificacoes() {
  try {
      let reservas = await $.ajax({
          url: "/api/reservas/reservasNotificacoes?userID= " + sessionStorage.getItem("userID"),
          method: "get",
          dataType: "json",
      });
      showNotificacoes(reservas);
  } catch (err) {
      console.log(err);
  }
}

async function fecharNotificacao(reservaID) {
  console.log(reservaID);
  try {
      let reserva = await $.ajax({
        url: "/api/reservas/updateNotificacao/" + reservaID,
        method: "put",
        dataType: "json"
      });
      loadNotificacoes();
    } catch (err) {
      console.log(err);
    }
  }