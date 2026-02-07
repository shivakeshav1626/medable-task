const express = require('express');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { getStats } = require('../data/users');

const router = express.Router();

router.get('/stats', authenticate, requireAdmin, async (req, res) => {
  try {
    const stats = getStats();

    return res.json({
      ...stats,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

