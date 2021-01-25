//to do: Método lugaresLivres


window.onload = function () {
    loadParques(null);
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
    if (sessionStorage.getItem("userID") !== null) {
        let nomeAside = document.getElementById("iconNome");
        nomeAside.innerHTML = "<a> " + sessionStorage.getItem("nome") + "</a>";
        let buttonAside = document.getElementById("sairButton");
        buttonAside.innerHTML = "<input type='button' class='sairB' value='Log Out' onClick='logOut()'></input>"
    }

}

async function logOut() {
    await sessionStorage.removeItem("userID");
    await sessionStorage.removeItem("nome");
    window.location = "index.html";
}


async function showParques(parques) {
    console.log(parques);
    let elemAside = document.getElementById("listaParques");
    let html = "";
    //if(parques){
    if (sessionStorage.getItem("userID") !== null) {
        let nomeAside = document.getElementById("iconNome");
        nomeAside.innerHTML = "<a id='nomeUser'> " + sessionStorage.getItem("nome") + "</a>";
        let buttonAside = document.getElementById("sairButton");
        buttonAside.innerHTML = "<input type='button' class='sairB' id='logOutB' value='Log Out' onClick='logOut()'></input>"
    }
    clearMarker();
    for (let parque of parques) {
        parquesMarkers(parque.Latitude, parque.Longitude, parque.Nome);
        // marker.bindPopup("<b>"+ parque.Nome +"</b>").openPopup();
        if (parque.LugaresDisponiveis !== 0){
        
        html += "<button class='button1' id = 'parque' onclick='selecionarParque(" + JSON.stringify(parque) + ")'><h1>" + parque.Nome + "</h1>" +
            "<p> Lugares Disponíveis: " + parque.LugaresDisponiveis + "</p>" +
            "<p> Preço diário: " + parque.precoDiario + "€</p></button>";
        }

        else{
        html += "<section class='buttonIndisponivel'><h1>" + parque.Nome + "</h1>" +
            "<p> Lugares Disponíveis: " + parque.LugaresDisponiveis + "</p>" +
            "<p> Preço diário: " + parque.precoDiario + "€</p></section>";
        }


        // if (sessionStorage.getItem("parqueNome") !== null) {
        //     for (i = 0; i < parques.length; i++) {
        //         if (sessionStorage.getItem("parqueNome") == parques[i].Nome)
        //             selecionarParque(JSON.stringify(parques[i]));
        //     }
        // }
    }
    elemAside.innerHTML = html;
}


function selecionarParque(parque) {
    sessionStorage.removeItem("parque");
    console.log(parque.ParqueID);
    sessionStorage.setItem("parqueID", parque.ParqueID);
    //showInfo(parque);
    window.location = "infoParque.html";
    //loadInfo(parque);

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
        console.log(parques);
    } catch (err) {
        let elemAside = document.getElementById("listaParques");
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}

async function verificarReservas() {
    var d = new Date();
    try {
        let result = await $.ajax({
            url: "/api/reserva/",
            method: "post",
            dataType: "json",
        });
        window.location = ("infoParque.html");
    } catch (err) {
        console.log(err);
        // mensagem para o utilizador
    }
}
