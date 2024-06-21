<?php
// Configuración de la conexión a la base de datos
$servername = "localhost"; // Cambiar si es necesario
$username = "root"; // Cambiar según tu configuración local
$password = ""; // Cambiar según tu configuración local
$dbname = "mi_torneo"; // Nombre de la base de datos

// Crear la conexión
$mysqli = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}
?>
