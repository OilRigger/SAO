function comandoConsola() {
    var divConsola = document.getElementById("divConsola");
    var mensaje = document.createElement("p");
    mensaje.textContent = "Ingrese un comando";
    divConsola.appendChild(mensaje);

    var input = document.createElement("input");
    input.type = "text";
    input.id = "comando";

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            executeCommand();
        }
    });

    divConsola.appendChild(input);
    input.focus();
}

function executeCommand() {
    var comando = document.getElementById("comando");
    var divConsola = document.getElementById("divConsola");
    var output = document.createElement("p");
   var command = comando.value.trim();

    if (command === "/system_time") {
        Fecha(output);
    } else if (command === "/list_users") {
        listUsers(output);
    } else if (command.startsWith("/profile ")) {
        var id = command.substring(9);
        profile(output, id);
    
    } else {
        output.textContent = "Este comando no existe.";
    }

    divConsola.appendChild(output);

    comando.value = "";
}

function Fecha(output) {
    var currentTime = new Date();
    var datePart = currentTime.toLocaleDateString();
    var timePart = currentTime.toLocaleTimeString();

    output.textContent =datePart + " " + timePart;
}

function profile(output, id) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data/profile.php" + id, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    // Parsea la respuesta JSON
                    var userData = JSON.parse(xhr.responseText);

                    // Muestra la información del usuario en la consola
                    output.textContent = "Perfil del usuario ID " + id + ":\n";
                    output.innerHTML += "Nombre de usuario: " + userData.username + "<br>";
                    output.innerHTML += "Nombre real: " + userData.real_name + "<br>";
                    output.innerHTML += "Género: " + userData.gendre + "<br>";
                    output.innerHTML += "Año de nacimiento: " + userData.birth_year + "<br>";
                    output.innerHTML += "Activo: " + (userData.active ? "Sí" : "No") + "<br>";
                    output.innerHTML += "Raza de juego: " + userData.game_race + "<br>";

                    // Muestra la foto de perfil si está disponible, de lo contrario, usa una foto genérica
                    if (userData.image) {
                        var img = document.createElement("img");
                        img.src = userData.image;
                        output.appendChild(img);
                    } else {
                        var defaultImg = document.createElement("img");
                        defaultImg.src = "img/question.jpg"; // Ruta de la foto genérica
                        output.appendChild(defaultImg);
                    }
                } catch (error) {
                    output.textContent = "Error al analizar la respuesta JSON.";
                }
            } else {
                output.textContent = "Error al obtener la información del usuario.";
            }
        }
    };

    xhr.send();
}

function listUsers(output) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data/listusers.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Maneja la respuesta como texto
            var rawResponse = xhr.responseText;
            // Verifica si la respuesta parece tener el formato esperado
            if (rawResponse.includes("id_user;name")) {
                var lines = rawResponse.split("\n");
                for (var i = 1; i < lines.length; i++) {
                    var userData = lines[i].split(";");
                    var formattedResponse =
                        "id_user: " + userData[0] +
                        " " + userData[1] +
                        " (" + userData[3] + ")" +
                        " (" + userData[2] + ")" +
                        " (" + userData[4] + ", " + userData[5] + ")" + "<br>";

                    output.innerHTML += formattedResponse;
                }
            } else {
                output.textContent = "La respuesta no tiene el formato esperado.";
            }
        }
    };

    xhr.send();
}




window.onload = function () {
    comandoConsola();
};