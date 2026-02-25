// src/controllers/planets.controller.js
// Controllers que usan async/await y manejan errores con try/catch.
// Cada controlador es responsable de traducir errores a respuestas HTTP.

const {
  getAllPlanets,
  createPlanet,
  updatePlanet,
  deletePlanet
} = require('../services/planets.service');

exports.getPlanets = async (req, res) => {
  try {
    const planets = await getAllPlanets(); // await al servicio asíncrono
    return res.status(200).json(planets);
  } catch (err) {
    // Log para debugging (no enviar stack a cliente en producción)
    console.error('GET /planets error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.createPlanet = async (req, res) => {
  try {
    const { name, diameter, hasLife } = req.body;

    // Validaciones simples
    if (!name || diameter === undefined) {
      return res.status(400).json({ error: 'Name and diameter are required' });
    }

    const newPlanet = await createPlanet({ name, diameter, hasLife });
    return res.status(201).json(newPlanet);
  } catch (err) {
    console.error('POST /planets error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.updatePlanet = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updatePlanet(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: 'Planet not found' });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error(`PUT /planets/${req.params.id} error:`, err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.deletePlanet = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deletePlanet(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Planet not found' });
    }

    return res.status(200).json({ message: 'Planet deleted' });
  } catch (err) {
    console.error(`DELETE /planets/${req.params.id} error:`, err);
    return res.status(500).json({ error: 'Server error' });
  }
};