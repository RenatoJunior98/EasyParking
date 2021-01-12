
async function newReview(review) {
    let elemAside = document.getElementById("main");
    let html = "";
    try {
        let reviews = await $.ajax({
            url: "/api/reviews/"+review,
            method: "post",
            dataType: "json",
            data: JSON.stringify(review),
            contentTupe: "application/json"
        });
        console.log(reviews);
        html += "<h1> Review efetuada com sucesso </h1>";
    } catch (err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}

function getReview(){
    let comentario = document.getElementById("reviewTexto").value;
    let classificacao = document.getElementById("classificacao").value;
    console.log(JSON.stringify(sessionStorage.getItem("parqueID")));
    console.log(JSON.stringify(sessionStorage.getItem("userID")));
    let parqueID = JSON.stringify(sessionStorage.getItem("parqueID"));
    let userID = JSON.stringify(sessionStorage.getItem("userID"));
    let review = {
        parqueID: parqueID,
        userID: userID,
        classificacao: classificacao,
        comentario: comentario
    }
    newReview(review);
}
