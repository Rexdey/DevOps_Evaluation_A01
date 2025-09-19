const express = require("express");
const router = express.Router();
const pool = require("./db");

// Crear usuario
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Obtener usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.params.id
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Actualizar usuario
router.put("/:id", async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating user" });
  }
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [
      req.params.id
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
