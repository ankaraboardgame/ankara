const express = require('express');
const router = express.Router();
module.exports = router;

/** API routes */
router.use('/move', require('./move'));
router.use('/encounter', require('./encounter'));
router.use('/action', require('./action'));
router.use('/location', require('./location'));
router.use('/card', require('./card'));
router.use('/ability', require('./ability'));