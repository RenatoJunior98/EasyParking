const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

 async function checkLogin(user, pass) {
	var userName=document.getElementById('username').value;
	var password=document.getElementById('pass').value;
	let elemAside = document.getElementById("IS");
	let html = "";
    try {
        let dados = await $.ajax({
            url: "/api/parques/"+user+"/"+pass,
            method: "get",
            dataType: "json"
        });
        for (let valor of dados) {
                if(!valor.UserID){
					console.log(valor.UserID);
					html += String(valor.UserID);
					//return valor.UserID;
				}
				
					//return 0;
    }
        elemAside.innerHTML = html;
    return UserID;
    } catch(err) {
        console.log(err);
        elemAside.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
}

//  function getuPassword(){
//     var text=document.getElementById('username').value;
//  }


// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });
// });
