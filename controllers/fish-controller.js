// fish-controller.js
const db = require('../models/db');
const path = require('path');
const fs = require('fs').promises;

exports.getAllFish = async (req, res, next) => {
  try {
    const fishes = await db.fish.findMany();
    res.json(fishes);
  } catch (error) {
    next(error);
  }
};

exports.createFish = async (req, res, next) => {
  const { title } = req.body;

  try {
    // Check if the 'uploads' folder exists, create it if not
    await fs.mkdir(path.resolve(__dirname, '../controllers/uploads'), { recursive: true });

    // Check if an image is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image' });
    }

    const imageBuffer = req.file.buffer;
    const imageName = `${Date.now()}_${req.file.originalname}`;

    // Save the image file
    await fs.writeFile(path.resolve(__dirname, '../controllers/uploads', imageName), imageBuffer);

    const newFish = await db.fish.create({
      data: { title, image: `/${imageName}` },
    });

    res.json(newFish);

  } catch (error) {
    next(error);
  }
};

exports.updateFish = async (req, res, next) => {
  const fishId = parseInt(req.params.id);
  const { title } = req.body;

  try {
    const updatedFish = await db.fish.update({
      where: { id: fishId },
      data: { title },
    });

    res.json(updatedFish);
  } catch (error) {
    next(error);
  }
};

exports.deleteFish = async (req, res, next) => {
  const fishId = parseInt(req.params.id);

  try {
    await db.fish.delete({
      where: { id: fishId },
    });

    res.json({ message: 'Fish deleted successfully' });
  } catch (error) {
    next(error);
  }
};
