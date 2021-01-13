async function addReview() {
    try {
        let comentario = document.getElementById("reviewTexto").value;
        let classificacao = parseInt(document.getElementById("classificacao").value);
        console.log(sessionStorage.getItem("parqueID"));
        console.log(sessionStorage.getItem("userID"));
        let parqueID = sessionStorage.getItem("parqueID");
        let userID = sessionStorage.getItem("userID");
        let review = {
            parqueID: parqueID,
            userID: userID,
            classificacao: classificacao,
            comentario: comentario
        }
        alert(JSON.stringify(review));
        let result = await $.ajax({
            url: "/api/reviews",
            method: "post",
            dataType: "json",
            data: JSON.stringify(review),
            contentType: "application/json"
        });
        alert(JSON.stringify(result));
    } catch (err) {
        console.log(err);
        // mensagem para o utilizador
    }
}


async function loadReviews(parqueID) {
    let elemAside = document.getElementById("reviews");
    try {
        let reviews = await $.ajax({
            url: "/api/reviews/"+parqueID,
            method: "get",
            dataType: "json"
        });
        sessionStorage.setItem("reviews",JSON.stringify(reviews)); 
    } catch(err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
}