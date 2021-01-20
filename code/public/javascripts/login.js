async function checkLogin() {
    var userName = document.getElementById('username').value;
    var password = document.getElementById('pass').value;
    let elemAside = document.getElementById("IS");
    let html = "";
    let UserID = 0;
    try {
        let dados = await $.ajax({
            url: "/api/users/" + userName + "/" + password,
            method: "get",
            dataType: "json"
        });
        for (let valor of dados) {
            if (valor.userID != null) {
                UserID = valor.userID;
                html += String(UserID);
            }
        }
        elemAside.innerHTML = html;
        sessionStorage.setItem("userID", UserID);
        alert(sessionStorage.getItem("userID"));
        window.open("index.html", "_self");
        return UserID;
    } catch (err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}

async function checkUsername(username) {
    try {
        let dados = await $.ajax({
            url: "/api/users/" + username,
            method: "get",
            dataType: "json"
        });
        if (dados.length == 0) {
            return true;
        }
        else
            return false;
    } 
    catch (err) {
    console.log(err);
}
}


async function addUSer() {
    try {
        let nome = document.getElementById("nome").value;
        let newUsername = document.getElementById("newUsername").value;
        let password = document.getElementById("newPass").value;
        let userValido = await checkUsername(newUsername);
        console.log(userValido);
        if (userValido == false) {
            alert("Username ja se encontra utilizado, por favor tente novamente com um username diferente!");
        }
        else {
            let user = {
                username: newUsername,
                pass: password,
                nome: nome,
            }
            let result = await $.ajax({
                url: "/api/users",
                method: "post",
                dataType: "json",
                data: JSON.stringify(user),
                contentType: "application/json"
            });
            alert("User registado")
        }
    } catch (err) {
        console.log(err);
    }

}

