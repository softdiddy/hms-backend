const userService = require('../services/user.service');

class UserController {
  async create(req, res) {
    try {
      const data = req.body;

      // Handle file upload (if photo exists)
      if (req.file) {
        data.photo = req.file.buffer.toString('base64');
      }

      const user = await userService.createUser(data);
      res.status(201).json({
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      console.error('❌ Create User Error:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ data: users });
    } catch (error) {
      console.error('❌ Fetch Users Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json({ data: user });
    } catch (error) {
      console.error('❌ Get User Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const data = req.body;
      if (req.file) data.photo = req.file.buffer.toString('base64');

      const user = await userService.updateUser(req.params.id, data);
      res.status(200).json({
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      console.error('❌ Update User Error:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('❌ Delete User Error:', error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
