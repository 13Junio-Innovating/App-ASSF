import { Router } from 'express';
import { pool } from '../db';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, date, time } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO appointments (user_id, date, time) VALUES ($1, $2, $3) RETURNING id',
      [userId, date, time]
    );
    res.status(201).json({ appointmentId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao agendar horário' });
  }
});

export default router;
