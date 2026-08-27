let senhaTrue = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let emailTrue = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const form = document.getElementById("idForm");
form.addEventListener("submit", function(event) {
event.preventDefault();

            let usuario = document.getElementById("usuario").value.trim();   
            let senha = document.getElementById("senha").value.trim();
            let email = document.getElementById("email").value.trim();
            
            if (usuario === "" || email === "" || senha ===""){
            alert("Todos campos devem ser preenchidos"); 
            return;
            }

            if ( usuario != usuario.trim() || usuario.trim().length < 2 || usuario.indexOf(" ") == -1)
                { alert("O usuário deve conter nome e sobrenome");
                  return;             
            }

            if (!emailTrue.test(email)) {
                alert("O email é inválido");
                return;
            }
            
            if (!senhaTrue.test(senha)){
                alert("A senha deve ter no mínimo 8 characteres, letras minusculas maiusculas e character especial");
                return;
            }
        
     
                 alert("Login realizado com sucesso");
                 sessionStorage.setItem("logado", "true");
                 window.location.href="painel.html";
            
     });
