window.onload = function () {
  showReserva();
}


function verificarLoginReserva() {
  console.log(sessionStorage.getItem("userID"));
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
    text: "Tem a certeza que quer fazer uma reserva neste parque?",
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
  console.log(parqueID);
  let userID = sessionStorage.getItem("userID");
  console.log(userID);
  let reserva = {
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

async function loadReservas() {
  try {
    let reservas = await $.ajax({
      url: "/api/reserva/reservas/" + sessionStorage.getItem("userID"),
      method: "get",
      dataType: "json"
    });
    return reservas;
  } catch (err) {
    console.log(err);
  }
}


async function showReserva() {
  let reservas = await loadReservas();
  console.log(reservas);
  let elemAtivas = document.getElementById("listaReservas-ativas");
  let elemHistorico = document.getElementById("listaReservas-historico");
  let htmlAtivas = "";
  let htmlHistorico = "";
  for (let reserva of reservas) {
    if (reserva.Estado == "Ativa")
      htmlAtivas += "<section class='reservaItem'> <h1>Nome do parque: " + reserva.Nome + "</h1><p>Codigo: " + reserva.Codigo + " </p> </section>";
    else
      htmlHistorico += "<section class='reservaItem'> <h1>Nome do parque: " + reserva.Nome + "</h1><p>Reserva " + reserva.Estado + "</p> <p>Codigo: " + reserva.Codigo + " </p> </section>";
  } 
  elemAtivas.innerHTML = htmlAtivas;
  elemHistorico.innerHTML = htmlHistorico;
}

