const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');

router.get('/states', locationController.getStates);
router.get('/states/:stateId/lgas', locationController.getLGAs);

module.exports = router;
