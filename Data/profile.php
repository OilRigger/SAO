<?php
if (!isset($_GET["id_user"]) || !is_numeric($_GET["id_user"]))
{
    echo "invalid id user";
    exit();
}

$file = "users/" . $_GET["id_user"] . ".json";

if (!file_exists($file)) {
    echo "user doesn't exists";
    exit();
}

echo file_get_contents($file);
?>