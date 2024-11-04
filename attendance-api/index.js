const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa cors

const app = express();
const PORT = 3000;

app.use(cors()); // Usa cors para permitir solicitudes de origen cruzado
app.use(bodyParser.json());

// Rutas de los archivos JSON
const attendanceFilePath = path.join(__dirname, 'data', 'attendances.json');
const usersFilePath = path.join(__dirname, 'data', 'users.json');

// Funciones para leer y escribir en archivos JSON
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

const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Rutas de asistencia (ya configuradas)
app.post('/attendance', (req, res) => {
    const { username, subject, section, room, date } = req.body;
    if (!username || !subject || !section || !room || !date) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const attendances = readData(attendanceFilePath);
    const existingAttendance = attendances.find(
        (record) =>
            record.username === username &&
            record.subject === subject &&
            record.date === date
    );

    if (existingAttendance) {
        return res.status(409).json({ message: 'Su asistencia ya ha sido registrada' });
    }

    const newAttendance = { username, subject, section, room, date, attendance: true };
    attendances.push(newAttendance);
    writeData(attendanceFilePath, attendances);
    res.status(201).json({ message: 'Asistencia registrada correctamente', attendance: newAttendance });
});


app.get('/attendance/:username', (req, res) => {
    const { username } = req.params;
    const attendances = readData(attendanceFilePath);
    const userAttendances = attendances.filter((record) => record.username === username);
    res.json(userAttendances);
});

// Ruta para autenticación de usuario
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Datos recibidos:', { username, password });
  
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

// Ruta para obtener el perfil del usuario
app.get('/user/:username', (req, res) => {
    const { username } = req.params;
    const users = readData(usersFilePath);
    const user = users.find((u) => u.username === username);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
