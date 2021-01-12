
window.onload = function () {
    showInfo();
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
    let elemAside = document.getElementById("info");
    let html = "";
    sessionStorage.setItem("parqueID", parqueInfo.ParqueID);
    //if(parques){
        html += "<h1>Nome = " + parqueInfo.Nome + "</h1>";
    //}

elemAside.innerHTML = html;
}