<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Restablecer Contraseña</title>
    <style>
      /* estilos propios para email */
      body { background-color: #f6f6f6; font-family: Arial, sans-serif; }
      .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 3px rgba(0,0,0,0.1); }
      .btn { background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; }
      .footer { text-align: center; color: #020202; font-size: 12px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Restablecer Contraseña</h2>
        <p>Hola,</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el siguiente botón para crear una nueva contraseña:</p>
        <p style="text-align: center;">
            <a href="{{ url('/users/password/edit?email=' . $email) }}" class="btn">Restablecer Contraseña</a>
        </p>
        <p>Si no solicitaste este cambio, ignora este correo.</p>
        <div class="footer">
            &copy; 2025 IsmaelBedmar
        </div>
    </div>
</body>
</html>
