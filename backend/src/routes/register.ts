import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../db';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );
    res.status(201).json({ userId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

export default router;
