const express = require("express");
const { body, validationResult } = require("express-validator");
const userSchema = require("../models/user");
const router = express.Router();


// create user
router.post("/users", [
  body("nombreDeFlor").notEmpty().withMessage("El nombre de la Flor es obligatorio"),
  body("codigo").isInt().withMessage("El codigo debe ser un número entero"),
  body("color").optional().isString("Ese color no existe"),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = new userSchema(req.body);

  user
    .save()
    .then((data) => res.json({ data: data }))
    .catch((error) => res.status(500).json({ error: "Error al guardar en la base de datos" }));
});
// get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

// get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

// update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { nombreDeFlor, codigo, color} = req.body;
  userSchema
    .updateOne({_id: id}, {$set: {nombreDeFlor,codigo,color}})
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

// delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

module.exports = router;





