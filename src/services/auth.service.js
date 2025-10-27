// src/services/auth.service.js
const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');

async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

module.exports = { createUser, findUserByEmail };
