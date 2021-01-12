async function checkLogin() {
	var userName=document.getElementById('username').value;
	var password=document.getElementById('pass').value;
	let elemAside = document.getElementById("IS");
    let html = "";
    let UserID = 0;
    try {
        let dados = await $.ajax({
            url: "/api/parques/"+userName+"/"+password,
            method: "get",
            dataType: "json"
        });
        for (let valor of dados) {
                if(valor.userID != null){
                    UserID = valor.userID;
					html += String(UserID);
					//return valor.UserID;
				}
				
					//return 0;
    }
        elemAside.innerHTML = html;
        sessionStorage.setItem( "userID", UserID);
        alert(sessionStorage.getItem("userID"));
        window.open("index.html","_self");
    return UserID;
    } catch(err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
}