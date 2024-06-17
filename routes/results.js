const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// Save a result
router.post('/', async (req, res) => {
    const { number, type, results } = req.body;

    const newResult = new Result({
        number,
        type,
        results,
    });

    try {
        const savedResult = await newResult.save();
        res.status(201).json(savedResult);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all results ordered by latest
router.get('/', async (req, res) => {
    try {
        const results = await Result.find().sort({ createdAt: -1 });
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
