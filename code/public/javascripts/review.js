async function addReview() {
    let comentario = document.getElementById("reviewTexto").value;
        let classificacao = parseInt(document.getElementById("classificacao").value);
        let parqueID = sessionStorage.getItem("parqueID");
        let userID = sessionStorage.getItem("userID");
        let review = {
            parqueID: parqueID,
            userID: userID,
            classificacao: classificacao,
            comentario: comentario
        }
    if (classificacao == null)
        swal("Introduza uma classificação ", "");
    else {
    try {
        let result = await $.ajax({
            url: "/api/reviews",
            method: "post",
            dataType: "json",
            data: JSON.stringify(review),
            contentType: "application/json"
        });
       window.location = "infoParque.html";
    } catch (err) {
        console.log(err);
    }
}
}

function verificarLoginReview() {
    if (sessionStorage.getItem("userID") == null)
        swal("Inicie sessão para poder fazer uma review", "");
    else
        window.location = "review.html";


}

