const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");

const app = express();
const port = 9000;

// Middleware
app.use(express.json());
app.use("/api", userRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('Bienvenido a mi Api de Flores');
});

// MongoDB connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a la Base de Datos');
    } catch (error) {
        console.error('No se pudo establecer conexión a la Base de Datos:', error);
    }
};

connect(); 

app.listen(port, () => console.log('Servidor escuchando en el puerto', port));
