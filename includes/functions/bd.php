<?php

//Credenciales de la base de datos
define("DB_USUARIO", "root");
define("DB_PASSWORD", "");
define("DB_HOST", "localhost");
define("DB_NOMBRE", "agendaphp");


$conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE);

//Sirve para verificar si se conecto exitosamente a la bd, nos devuelve un 1
//echo $conn->ping();


?>