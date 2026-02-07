function toPublicUser(user) {
  if (!user) {
    return null;
  }

  const { password, ...rest } = user;
  return rest;
}

module.exports = {
  toPublicUser
};
