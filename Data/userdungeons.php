<?php
if (!isset($_GET["id_user"]) || !is_numeric($_GET["id_user"]))
{
    echo "invalid id user";
    exit();
}

$file = "dungeons/" . $_GET["id_user"] . ".json";

if (!file_exists($file)) {
    echo "user dungeons don't exists";
    exit();
}

echo file_get_contents($file);
?>