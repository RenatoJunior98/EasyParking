function fazerReserva(){
    if(sessionStorage.getItem("userID")!==null)
    addReview()
    else
    swal("Inicie sessão para poder fazer uma reserva");
}

async function addReview() {
    swal({
        title: "Confirmação de reserva",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "info",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
}