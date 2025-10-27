// src/prismaClient.js

const { PrismaClient } = require('@prisma/client');

// Create a single Prisma Client instance
// This ensures we reuse the connection instead of creating multiple instances
const prisma = new PrismaClient();

module.exports = prisma;
