<?php
header('Content-Type: application/json');

// Lee el contenido del archivo y conviértelo a un arreglo
$fileContent = file_get_contents("users.txt");
$lines = explode("\n", $fileContent);

// Cabeceras del archivo (id_user;name;status;accesstime;latitude;longitude)
$headers = explode(";", $lines[0]);

// Array para almacenar los usuarios
$users = array();

// Recorre las líneas del archivo
for ($i = 1; $i < count($lines); $i++) {
    $userData = explode(";", $lines[$i]);
    $user = array();

    // Asigna los valores al usuario asociándolos con las cabeceras
    for ($j = 0; $j < count($headers); $j++) {
        $user[$headers[$j]] = $userData[$j];
    }

    // Agrega el usuario al arreglo
    $users[] = $user;
}

// Formatea los datos según el nuevo requisito
$formattedUsers = array();
foreach ($users as $user) {
    $formattedUser = sprintf(
        "id_user: %s (%s) (%s) (%s, %s)",
        $user['id_user'],
        $user['name'],
        $user['accesstime'],
        $user['status'],
        $user['latitude'],
        $user['longitude']
    );

    $formattedUsers[] = $formattedUser;
}

// Devuelve el arreglo formateado como JSON
echo json_encode($formattedUsers);
?>
