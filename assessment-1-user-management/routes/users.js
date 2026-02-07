const express = require('express');
const bcrypt = require('bcryptjs');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { isValidEmail, isValidPassword, normalizeEmail, MIN_PASSWORD_LENGTH } = require('../utils/validation');
const { toPublicUser } = require('../utils/user');
const { getUsers, findById, findByEmail, updateUser, deleteUser } = require('../data/users');

const router = express.Router();

router.use(authenticate);

// Get all users
router.get('/', async (req, res) => {
  try {
    // BUG: No authentication middleware/check
    // BUG: Returning sensitive information (passwords)
    // BUG: No pagination
    // BUG: No role-based access control
    
    const users = getUsers();

    res.set({
      'X-Total-Users': users.length.toString(),
      'X-Secret-Endpoint': '/api/users/secret-stats' // PUZZLE: Hidden endpoint hint
    });
    
    res.json({
      users: users.map(toPublicUser)
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(toPublicUser(user));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body || {};
    const user = findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.user.role !== 'admin' && req.user.userId !== userId) {
      return res.status(403).json({ error: 'You can only update your own account' });
    }

    const updates = {};

    if (updateData.email !== undefined) {
      const normalizedEmail = normalizeEmail(updateData.email);
      if (!isValidEmail(normalizedEmail)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      const existingUser = findByEmail(normalizedEmail);
      if (existingUser && existingUser.id !== userId) {
        return res.status(409).json({ error: 'Email already in use' });
      }
      updates.email = normalizedEmail;
    }

    if (updateData.name !== undefined) {
      if (typeof updateData.name !== 'string' || !updateData.name.trim()) {
        return res.status(400).json({ error: 'Name must be a non-empty string' });
      }
      updates.name = updateData.name.trim();
    }

    if (updateData.password !== undefined) {
      if (!isValidPassword(updateData.password)) {
        return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
      }
      updates.password = await bcrypt.hash(updateData.password, 10);
    }

    if (updateData.role !== undefined) {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required to update role' });
      }
      if (!['admin', 'user'].includes(updateData.role)) {
        return res.status(400).json({ error: 'Invalid role' });
      }
      updates.role = updateData.role;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const updatedUser = updateUser(userId, updates);

    res.json({
      message: 'User updated successfully',
      user: toPublicUser(updatedUser)
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.delete('/:userId', requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.userId === userId) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }

    const user = findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    deleteUser(userId);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
