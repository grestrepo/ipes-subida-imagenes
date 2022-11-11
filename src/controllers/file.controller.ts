import { Request, Response } from 'express';

import { UploadFileService, DeleteFileService } from '../services';

const uploadFileService = new UploadFileService();
const deleteFileService = new DeleteFileService();

export const uploadFileController = async (req: Request, res: Response) => {
  try {
    const pathFile = req.body.path || '';
    const nameFile = req.body.nameFile || `${new Date().getTime()}`;
    const uploadPath = await uploadFileService.uploadImage(
      req.files!,
      pathFile,
      nameFile
    );

    if (uploadPath.includes('cms')) {
      return res.status(200).json({
        path: uploadPath.replace('cms/', ''),
        message: 'Path se devolvió con éxito',
      });
    }

    return res.status(200).json({
      path: uploadPath,
      message: 'Path se devolvió con éxito',
    });
  } catch (error) {
    console.error('Ocurrió un error');
    return res.status(500).json({
      error,
    });
  }
};

export const deleteFileController = async (req: Request, res: Response) => {
  const pathFile = req.body.url || '';
  const path = req.body.path || '';

  const deleteFile = await deleteFileService.deleteImage(pathFile, path);

  return res.status(deleteFile.code).json({
    message: deleteFile.message,
  });
};
