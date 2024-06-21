<?php
// registro.php

// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Incluir archivo de conexión a la base de datos
    include 'conexion.php';

    // Recuperar datos del formulario
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encriptar la contraseña

    // Consulta SQL para insertar nuevo usuario
    $stmt = $mysqli->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    if ($stmt === false) {
        die('Error de preparación de consulta: ' . $mysqli->error);
    }

    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();

    // Verificar si se ha insertado correctamente el usuario
    if ($stmt->affected_rows > 0) {
        // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
        session_start();
        $_SESSION['registro_exitoso'] = true;
        header("Location: login.html");
        exit();
    } else {
        // Error al registrar el usuario
        $_SESSION['error_message'] = "Error al registrar el usuario. Inténtalo de nuevo.";
        header("Location: registro.html");
        exit();
    }

    // Cerrar la conexión y liberar recursos
    $stmt->close();
    $mysqli->close();
}
?>
