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
        await swal("Reserva feita com sucesso!", "");
        let result = await $.ajax({
            url: "/api/reviews",
            method: "post",
            dataType: "json",
            data: JSON.stringify(review),
            contentType: "application/json"
        });
    } catch (err) {
        console.log(err);
        // mensagem para o utilizador
    }
}

function fazerReview(){
    if(sessionStorage.getItem("userID")!==null)
    window.location= "review.html";
    else
    swal("Inicie sessão para poder fazer uma review");
}

