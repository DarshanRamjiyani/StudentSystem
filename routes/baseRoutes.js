const express = require('express');
const router = express.Router();
const adminRoutes = require('./loginRoutes');
const studentRoutes = require('./studentRoutes');


router.use('/admin', adminRoutes);
router.use('/student', studentRoutes);

module.exports = router;