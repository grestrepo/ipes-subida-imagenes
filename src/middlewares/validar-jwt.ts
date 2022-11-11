import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/pool';

export const validarJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      message: 'No hay token en la petición',
    });
  }

  try {
    if (process.env.JWT_SECRET_KEY) {
      const key: any = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (key.id) {
        const query = `SELECT * FROM public.admins WHERE id = $1`;
        const result = await pool.query(query, [key.id]);

        if (result.rowCount > 0) {
          return next();
        } else {
          throw new Error('User not found');
        }
      }

      throw new Error('Malformed token');
    }

    throw new Error('Secret key not available');
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: 'Token no válido',
    });
  }
};
