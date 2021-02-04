window.onload = function () {
  showReserva();
}

async function loadReservas() {
  try {
    let reservas = await $.ajax({
      url: "/api/reservas/reservasUser?userID= " + sessionStorage.getItem("userID"),
      method: "get",
      dataType: "json",
    });
    return reservas;
  } catch (err) {
    console.log(err);
  }
}


async function showReserva() {
  let reservas = await loadReservas();
  let elemAtivas = document.getElementById("listaReservas-ativas");
  let elemHistorico = document.getElementById("listaReservas-historico");
  let htmlAtivas = "";
  let htmlHistorico = "";
  for (let reserva of reservas) {
    if (reserva.Estado == "Em espera" || reserva.Estado == "Ativa")
      htmlAtivas += "<section class='reservaItem'> <h1>Nome do parque: " + reserva.Nome + "</h1><p>Reserva " + reserva.Estado + "</p> <p>Codigo: " + reserva.Codigo + " </p> <p>Dia: " + reserva.DiaReserva + " </p> <p>Reserva feita no dia: " + reserva.DataHora + " </p> </section>";
    else
      htmlHistorico += "<section class='reservaItem'> <h1>Nome do parque: " + reserva.Nome + "</h1><p>Reserva " + reserva.Estado + "</p> <p>Codigo: " + reserva.Codigo + " <p>Dia: " + reserva.DiaReserva + " </p><p>Reserva feita no dia: " + reserva.DataHora + " </p> </section> ";
  } 
  elemAtivas.innerHTML = htmlAtivas;
  elemHistorico.innerHTML = htmlHistorico;
}

