const locationService = require('../services/location.service');

class LocationController {
  async getStates(req, res) {
    const states = await locationService.getAllStates();
    res.json(states);
  }

  async getLGAs(req, res) {
    const lgas = await locationService.getLGAsByState(req.params.stateId);
    res.json(lgas);
  }
}

module.exports = new LocationController();
