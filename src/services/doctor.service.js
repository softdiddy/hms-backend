const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');

class DoctorService {
  async createDoctor(data) {
    const password = await bcrypt.hash(data.phoneNumber, 10);
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password,
        role: 'DOCTOR',
        specialization: data.specialization,
        stateId: data.stateId,
        lgaId: data.lgaId,
      },
    });
  }

  getAllDoctors() {
    return prisma.user.findMany({
      where: { role: 'DOCTOR' },
      include: { state: true, lga: true },
    });
  }

  getDoctorById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) },
      include: { state: true, lga: true },
    });
  }

  updateDoctor(id, data) {
    return prisma.user.update({
      where: { id: Number(id) },
      data,
    });
  }

  deleteDoctor(id) {
    return prisma.user.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new DoctorService();
