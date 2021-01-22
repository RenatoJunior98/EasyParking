function fazerReserva(){
    if(sessionStorage.getItem("userID")!==null)
    window.location= "reserva.html";
    else
    swal("Inicie sessão para poder fazer uma reserva");
}