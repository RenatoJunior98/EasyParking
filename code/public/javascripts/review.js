async function newReviw() {
    let elemAside = document.getElementById("listaParques");
    if (parquesFiltrados){
        showParques(parquesFiltrados);
    }
    else{
    try {
        let parques = await $.ajax({
            url: "/api/review/"+comentario+"/"+classificacao,
            method: "post",
            dataType: "json"
        });
        
    } catch (err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}
}