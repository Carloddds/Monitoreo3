const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Almacén en memoria: { [id]: {nombre, estado, ultima_actividad, ubicacion} }
const dispositivos = {};

app.use(cors());
app.use(express.json());

// Endpoint para que los dispositivos envíen datos
app.post("/api/reportar", (req, res) => {
    const { id, nombre, estado, ubicacion } = req.body;
    if (!id || !nombre) return res.status(400).json({ error: "Faltan campos obligatorios" });

    dispositivos[id] = {
        nombre,
        estado: estado || "Desconocido",
        ubicacion: ubicacion || "Sin ubicar",
        ultima_actividad: new Date().toISOString().replace("T", " ").substring(0, 19)
    };
    res.json({ ok: true });
});

// Endpoint para consultar el estado de todos los dispositivos
app.get("/api/dispositivos", (req, res) => {
    res.json(Object.values(dispositivos));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});