const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sql, poolPromise } = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const pool = await poolPromise;
    const result = await pool.request()
        .input("email", sql.NVarChar, email)
        .query("SELECT * FROM usuarios WHERE email = @email");

    const user = result.recordset[0];

    if (!user) return res.status(404).send("Usuario no encontrado");

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).send("Contraseña incorrecta");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});

// Obtener cuentas del usuario autenticado
app.get("/cuentas", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Token requerido");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const pool = await poolPromise;
        const result = await pool.request()
            .input("id_usuario", sql.Int, decoded.id)
            .query("SELECT * FROM cuentas WHERE id_usuario = @id_usuario");
        res.json(result.recordset);
    } catch (err) {
        res.status(401).send("Token inválido");
    }
});

app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});