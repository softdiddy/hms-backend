const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');

router.post('/', doctorController.create.bind(doctorController));
router.get('/', doctorController.getAll.bind(doctorController));
router.get('/:id', doctorController.getById.bind(doctorController));
router.put('/:id', doctorController.update.bind(doctorController));
router.delete('/:id', doctorController.delete.bind(doctorController));

module.exports = router;
