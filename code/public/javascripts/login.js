async function checkLogin() {
    var userName = document.getElementById('username').value;
    var password = document.getElementById('pass').value;
    let user = {
        username: userName,
        pass: password
    } 
    if (userName.length == 0)
        swal("Introduza um Username ", "");
    else if (password.length == 0)
        swal("Introduza uma password ", "");
    else {
        try {
            let dados = await $.ajax({
                url: "/api/users/LoginDados/",
                method: "get",
                dataType: "json",
                data: user,
                contentType: "application/json"

            });
            if (dados[0] != null) {
                await swal("Sessão Iniciada com sucesso!", "");
                sessionStorage.setItem("nome", dados[0].nome);
                window.location = "index.html";
            }
            else
            await swal("Username ou password incorreto!", "");;
        } catch (err) {
           
            console.log(err);
        }
    }
}


async function addUSer() {
    let nome = document.getElementById("nome").value;
    let newUsername = document.getElementById("newUsername").value;
    let password = document.getElementById("newPass").value;
    if (nome.length == 0)
        swal("Introduza um nome ", "");
    else if (newUsername.length == 0)
        swal("Introduza uma username ", "");
    else if (password.length == 0)
        swal("Introduza uma password ", "");
    else {
        let user = {
            username: newUsername,
            pass: password,
            nome: nome,
        }
        try {
            let result = await $.ajax({
                url: "/api/users/newUSer",
                method: "post",
                dataType: "json",
                data: JSON.stringify(user),
                contentType: "application/json"
            });
            if (result == null) {
                swal("Username ja se encontra utilizado, por favor tente novamente com um username diferente!", "");
            }
            swal("User registado")
        } catch (err) {
            console.log(err);
        }
    }
}
