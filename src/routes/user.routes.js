const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/user.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('photo'), userController.create.bind(userController));
router.get('/', userController.getAll.bind(userController));
router.get('/:id', userController.getById.bind(userController));
router.put('/:id', upload.single('photo'), userController.update.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

module.exports = router;
