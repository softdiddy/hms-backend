const prisma = require('../prismaClient');

class LocationService {
  async getAllStates() {
    try {
      return await prisma.state.findMany();
    } catch (error) {
      console.error('Error fetching states:', error);
      throw error;
    }
  }

  async getLGAsByState(stateId) {
    try {
      return await prisma.lga.findMany({
        where: { stateId: Number(stateId) },
      });
    } catch (error) {
      console.error(`Error fetching LGAs for state ${stateId}:`, error);
      throw error;
    }
  }
}

module.exports = new LocationService();
