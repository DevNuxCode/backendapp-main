
const respuesta = require('../../red/respuestas')


const express = require('express');
const router = express.Router();
const controller = require('./controlador');

router.get('/', async (req, res) => {
    try {
        const items = await controller.todos();
        res.json({
            success: true,
            data: items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;