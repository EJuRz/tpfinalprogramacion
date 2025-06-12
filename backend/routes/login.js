const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("Petición recibida en /login con body:", req.body);
  const { usuario, password } = req.body;
  fs.readFile("usuarios.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error leyendo usuarios.json:", err);
      return res.status(500).json({ success: false, message: "Error de servidor" });
    }
    try {
      const usuarios = JSON.parse(data);
      const valido = usuarios.find(u => u.usuario === usuario && u.password === password);
      if (valido) {
        console.log("Login exitoso para:", usuario);
        res.json({ success: true });
      } else {
        console.warn("Login fallido para:", usuario);
        res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
      }
    } catch (e) {
      console.error("Error parseando JSON de usuarios.json:", e);
      res.status(500).json({ success: false, message: "Error de formato en usuarios.json" });
    }
  });
});

module.exports = router;