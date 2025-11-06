const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');

class UserService {
  /**
   * Create a new user
   */
  async createUser(data) {
    if (!data.name) throw new Error('Name is required');
    if (!data.phoneNumber) throw new Error('Phone number is required');

    const hashedPassword = await bcrypt.hash(data.password || data.phoneNumber, 10);

    const normalizedRole = (data.role).toUpperCase();

    return prisma.user.create({
      data: {
        name: data.name.trim(),
        email: data.email?.trim() || null,
        phoneNumber: data.phoneNumber.trim(),
        password: hashedPassword,
        role: normalizedRole,
        stateId: data.stateId ? Number(data.stateId) : null,
        lgaId: data.lgaId ? Number(data.lgaId) : null,
        specialization: data.specialization || null,
        forceChangePwd: true,
      },
    });
  }

  /**
   * Get all users
   */
  async getAllUsers() {
    return prisma.user.findMany({
      include: {
        state: true,
        lga: true,
      },
      where: {
        role: {
          not: 'SUPER_ADMIN',
        },
      },  
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get user by ID
   */
  async getUserById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        state: true,
        lga: true,
      },
    });
  }

  /**
   * Update user
   */
  async updateUser(id, data) {
    const updateData = {
      name: data.name?.trim(),
      email: data.email?.trim(),
      phoneNumber: data.phoneNumber?.trim(),
      role: data.role?.toUpperCase() || data.role?.toUpperCase(),
      specialization: data.specialization,
      stateId: data.stateId ? Number(data.stateId) : undefined,
      lgaId: data.lgaId ? Number(data.lgaId) : undefined,
      photo: data.photo || undefined,
    };

    // Remove undefined/null fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) delete updateData[key];
    });

    return prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });
  }

  /**
   * Delete user
   */
  async deleteUser(id) {
    return prisma.user.delete({ where: { id: Number(id) } });
  }
}

module.exports = new UserService();
