import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';

const extensionesValidas = ['jpg', 'png', 'webp', 'jpeg'];

export const validarImagenes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      message: 'No hay un file en la petición',
    });
  }

  if (!req.files.file) {
    return res.status(400).json({
      message: 'No viene el file',
    });
  }

  const file = req.files.file as UploadedFile;
  const nameSplit = file.name.split('.');
  const extensionFile = nameSplit[nameSplit.length - 1];

  if (!extensionesValidas.includes(extensionFile)) {
    return res.status(400).json({
      message: 'Formato de imagen inválida',
    });
  }

  return next();
};
