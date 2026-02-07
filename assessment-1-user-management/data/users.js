const users = [
  {
    id: '1',
    email: 'admin@test.com',
    password: '$2a$10$8K1p/a0dCVIRRqL.Qk0mce7LzYVbKuLyZg.3/t.NzXo/1UhqKqYxa', // 'admin123'
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date('2024-01-01').toISOString()
  },
  {
    id: '2',
    email: 'user@test.com',
    password: '$2a$10$qHT2AjOcNsXJKPc4G8/yte1FOjTxKqYfCYh2KNF9xD8FbhPi0qO8u', // 'user123'
    name: 'Regular User',
    role: 'user',
    createdAt: new Date('2024-01-02').toISOString()
  }
];

function getUsers() {
  return users;
}

function findByEmail(email) {
  return users.find(u => u.email === email);
}

function findById(id) {
  return users.find(u => u.id === id);
}

function addUser(user) {
  users.push(user);
  return user;
}

function updateUser(id, updates) {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return null;
  }

  users[index] = { ...users[index], ...updates };
  return users[index];
}

function deleteUser(id) {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return null;
  }

  return users.splice(index, 1)[0];
}

function getStats() {
  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.role === 'admin').length;
  const regularUsers = totalUsers - adminUsers;

  return {
    totalUsers,
    adminUsers,
    regularUsers
  };
}

module.exports = {
  getUsers,
  findByEmail,
  findById,
  addUser,
  updateUser,
  deleteUser,
  getStats
};
