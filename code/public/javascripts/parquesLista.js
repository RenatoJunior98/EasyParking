window.onload = function () {
    loadParques(null);
    verificarReservas();
    if (sessionStorage.getItem("userID") !== null)
        loadNotificacoes();
}

async function loadParques(parquesFiltrados) {
    let elemAside = document.getElementById("listaParques");
    if (parquesFiltrados) {
        showParques(parquesFiltrados);
    }
    else {
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

async function logOut() {
    await sessionStorage.removeItem("userID");
    await sessionStorage.removeItem("nome");
    window.location = "index.html";
}


async function showParques(parques) {
    let elemAside = document.getElementById("listaParques");
    let html = "";
    if (sessionStorage.getItem("userID") !== null) {
        let nomeAside = document.getElementById("iconNome");
        nomeAside.innerHTML = "<a>" + sessionStorage.getItem("nome") + "</a>";
        let buttonReservasAside = document.getElementById("reservasButton");
        buttonReservasAside.innerHTML = "<input type='button' class='reservasB' value='Reservas' onclick='reservasLogin()'></input>";
        let buttonAside = document.getElementById("sairButton");
        buttonAside.innerHTML = "<input type='button' class='sairB' value='Log Out' onClick='logOut()'></input>";
    }
    clearMarker();
    for (let parque of parques) {
        parquesMarkers(parque.Latitude, parque.Longitude, parque.Nome, parque.ParqueID);
        if (parque.LugaresDisponiveis !== 0) {

            html += "<section class='button1' id = 'parque' onclick='selecionarParque(" + parque.ParqueID + ")'><h1>" + parque.Nome + "</h1>" +
                "<p> Lugares Disponíveis: " + parque.LugaresDisponiveis + "</p>" +
                "<p> Preço diário: " + parque.precoDiario + "€</p></section>";
        }

        else {
            html += "<section class='buttonIndisponivel' onclick='selecionarParque(" + parque.ParqueID + ")' ><h1>" + parque.Nome + "</h1>" +
                "<p> Lugares Disponíveis: " + parque.LugaresDisponiveis + "</p>" +
                "<p> Preço diário: " + parque.precoDiario + "€</p></section>";
        }

    }
    elemAside.innerHTML = html;
}


function selecionarParque(parqueID) {
    sessionStorage.setItem("parqueID", parqueID);
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

async function verificarReservas() {
    try {
        let reservas = await $.ajax({
            url: "/api/reservas/newState",
            method: "put",
            dataType: "json"
        });
    } catch (err) {
        console.log(err);
    }
}

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
    for (let reserva of reservas.reservas) {
        if (reserva.Estado == "Em espera")
            html += "<section class='sectionNotificacao'> <input type='button' class='apagarNotificacao' value='✘' onclick='fecharNotificacao("+reserva.ReservaID+")' > "+
            "<h3>"+  reserva.Nome  +"</h3>"+
            "<p> Tem uma reserva " + reserva.Estado + " no dia: " + reserva.DiaReserva + "</p> </section>";
        if (reserva.Estado == "Ativa")
            html += "<section class='sectionNotificacao'> <input type='button' class='apagarNotificacao' value='✘' onclick='fecharNotificacao("+reserva.ReservaID+")' > "+
            "<h3>"+  reserva.Nome  +"</h3>"+
            "<p> Tem uma reserva " + reserva.Estado + " para hoje </p> </section>";
    }
    html += "</section>"
    section.innerHTML = html;
}


async function loadNotificacoes() {
    try {
        let reservas = await $.ajax({
            url: "/api/reservas/reservasNotificacoes/" + sessionStorage.getItem("userID"),
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