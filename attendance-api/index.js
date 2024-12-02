const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas de datos
const usersFilePath = path.join(__dirname, 'data', 'users.json');

// Función para leer usuarios
const readData = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error al parsear el archivo JSON en ${filePath}:`, error);
    return [];
  }
};

// Función para escribir usuarios
const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Configurar transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contactoduoc@gmail.com', // Cambia esto por tu correo
    pass: 'zqmy bgvd geqb ozsy', // Usa una contraseña de aplicación
  },
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Intento de inicio de sesión - Usuario: ${username}, Contraseña: ${password}`);

  if (!username || !password) {
    return res.status(400).json({ message: 'Username y password son requeridos' });
  }

  const users = readData(usersFilePath);
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Autenticación exitosa', user });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

// Ruta para restablecimiento de contraseña
app.post('/reset-password', async (req, res) => {
  const { username } = req.body;

  console.log(`Solicitud de restablecimiento de contraseña para el usuario: ${username}`);

  if (!username) {
    return res.status(400).json({ message: 'El nombre de usuario es requerido' });
  }

  const users = readData(usersFilePath);
  const user = users.find((u) => u.username === username);

  if (!user) {
    console.log(`Usuario no encontrado: ${username}`);
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // Generar contraseña temporal
  const tempPassword = Math.random().toString(36).slice(-8);
  user.password = tempPassword; // Actualizar contraseña temporal
  writeData(usersFilePath, users);

  console.log(`Contraseña temporal generada para ${username}: ${tempPassword}`);
  console.log(`Enviando correo a: ${user.email}`);

  const mailOptions = {
    from: 'contactoduoc@gmail.com',
    to: user.email,
    subject: 'Restablecimiento de contraseña',
    text: `Hola ${user.nombre},\n\nTu nueva contraseña temporal es: ${tempPassword}\nPor favor, cámbiala después de iniciar sesión.\n\nSaludos, Equipo de soporte.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado exitosamente a: ${user.email}`);
    res.status(200).json({ message: 'Correo de restablecimiento enviado' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'No se pudo enviar el correo de restablecimiento' });
  }
});

app.post('/change-password', (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
  
    const users = readData(usersFilePath);
    const user = users.find((u) => u.password === currentPassword); // Aquí puedes usar un campo como "id" para identificar al usuario
  
    if (!user) {
      return res.status(401).json({ message: 'La contraseña actual no es correcta.' });
    }
  
    user.password = newPassword;
    writeData(usersFilePath, users);
  
    res.status(200).json({ success: true, message: 'Contraseña actualizada exitosamente.' });
  });
  

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
