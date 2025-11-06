const prisma = require('../prismaClient');

class UserRepository {
  create(data) {
    return prisma.user.create({ data });
  }

  findAll() {
    return prisma.user.findMany({
      include: { state: true, lga: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) },
      include: { state: true, lga: true },
    });
  }

  update(id, data) {
    return prisma.user.update({
      where: { id: Number(id) },
      data,
    });
  }

  delete(id) {
    return prisma.user.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new UserRepository();
