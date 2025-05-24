// Cambia por la IP o dominio de tu servidor backend
const BACKEND = "http://localhost:3000";

const datos = {
    id: "dispositivo-juanito", // Cambia por un ID único
    nombre: "Teléfono de Juanito",
    estado: "Activo",
    ubicacion: "Madrid, España"
};

// Envía los datos al backend cada 30 segundos
setInterval(() => {
    fetch(`${BACKEND}/api/reportar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(json => console.log("Reportado:", json))
    .catch(err => console.error("Error:", err));
}, 30000);