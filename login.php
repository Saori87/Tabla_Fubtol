<?php
session_start();

// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Incluir archivo de conexión a la base de datos
    include 'conexion.php';

    // Recuperar datos del formulario
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Consulta SQL para seleccionar al usuario por su nombre de usuario
$stmt = $mysqli->prepare("SELECT id, username, password FROM users WHERE username = ?");
if ($stmt === false) {
    die('Error de preparación de consulta: ' . $mysqli->error);
}

$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

    // Verificar si se encontró al usuario
    if ($stmt->num_rows == 1) {
        // Vincular variables a los resultados
        $stmt->bind_result($id, $username, $hashed_password);
        $stmt->fetch();

        // Verificar si la contraseña ingresada coincide con la contraseña almacenada
        if (password_verify($password, $hashed_password)) {
            // Contraseña correcta, iniciar sesión
            $_SESSION['id'] = $id;
            $_SESSION['username'] = $username;
            $_SESSION['logged_in'] = true;

            // Redirigir al usuario a la página principal después del inicio de sesión
            header("Location: main.html");
            exit();
        } else {
            // Contraseña incorrecta
            $_SESSION['error_message'] = "Contraseña incorrecta. Inténtalo de nuevo.";
            header("Location: login.html");
            exit();
        }
    } else {
        // Usuario no encontrado
        $_SESSION['error_message'] = "Usuario no encontrado. Inténtalo de nuevo.";
        header("Location: login.html");
        exit();
    }

    // Cerrar la conexión y liberar recursos
    $stmt->close();
    $mysqli->close();
}
?>
