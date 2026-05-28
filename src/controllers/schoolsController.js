import { School } from '../models/index.js';

export const getSchools = async (req, res) => {
  try {
    const schools = await School.findAll({
      attributes: ['id', 'title', 'name', 'address', 'phone', 'email', 'image1', 'quota'],
      order: [['title', 'ASC'], ['name', 'ASC']]
    });
    res.json(schools);
  } catch (err) {
    console.error('getSchools error:', err);
    res.status(500).json({ error: 'Failed to fetch schools' });
  }
};
