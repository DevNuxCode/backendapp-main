const express = require('express');
const router = express.Router();

// Importación de rutas
const authRoutes = require('../auth.routes');
const userRoutes = require('../user.routes');
// ... otros imports de rutas

// Rutas base
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

// Ruta de prueba/health check
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API funcionando correctamente',
        timestamp: new Date()
    });
});

// Manejo de rutas no encontradas
router.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Ruta no encontrada'
    });
});

module.exports = router; 