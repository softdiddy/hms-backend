const doctorService = require('../services/doctor.service');

class DoctorController {
  async create(req, res) {
    try {
      const doctor = await doctorService.createDoctor(req.body);
      res.status(201).json(doctor);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    const doctors = await doctorService.getAllDoctors();
    res.json(doctors);
  }

  async getById(req, res) {
    const doctor = await doctorService.getDoctorById(req.params.id);
    res.json(doctor);
  }

  async update(req, res) {
    try {
      const doctor = await doctorService.updateDoctor(req.params.id, req.body);
      res.json(doctor);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await doctorService.deleteDoctor(req.params.id);
      res.json({ message: 'Doctor deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new DoctorController();
