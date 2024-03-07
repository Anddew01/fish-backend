const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const fishController = require('../controllers/fish-controller'); 
const path = require('path');

// Import middleware
const { uploadImage } = require('../middlewares/uploadImage');

router.get('/fishes', authenticate, fishController.getAllFish);
router.post('/fishes', authenticate, uploadImage, fishController.createFish);
router.put('/fishes/:id', authenticate, fishController.updateFish);
router.delete('/fishes/:id', authenticate, fishController.deleteFish);

router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.resolve(__dirname, '../controllers/uploads', imageName));
});

module.exports = router;
