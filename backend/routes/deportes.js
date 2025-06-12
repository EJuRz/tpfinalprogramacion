const express = require('express');
const Deporte = require('../models/Deporte');
const router = express.Router();

// Obtener todos los deportes
router.get('/', async (req, res) => {
  try {
    const deportes = await Deporte.findAll();
    res.json(deportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener deportes' });
  }
});

// Crear un deporte
router.post('/', async (req, res) => {
  try {
    const { nombre, tipo, cant_jugadores, descripcion } = req.body;
    const nuevo = await Deporte.create({ nombre, tipo, cant_jugadores, descripcion });
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear deporte' });
  }
});

// Modificar un deporte
router.put('/:id', async (req, res) => {
  try {
    const { nombre, tipo, cant_jugadores, descripcion } = req.body;
    await Deporte.update(
      { nombre, tipo, cant_jugadores, descripcion },
      { where: { id: req.params.id } }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar deporte' });
  }
});

// Eliminar un deporte
router.delete('/:id', async (req, res) => {
  try {
    await Deporte.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar deporte' });
  }
});

module.exports = router;