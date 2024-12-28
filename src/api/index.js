const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Hello World',
        timestamp: new Date(),
        status: 'API is running'
    });
});

module.exports = router;
