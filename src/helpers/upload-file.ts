import path from 'path';
import { UploadedFile, FileArray } from 'express-fileupload';

export const uploadFileHelper = (
  files: FileArray,
  folder = '',
  nameFile: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const file: UploadedFile = files.file as UploadedFile;
    const nameSplit = file.name.split('.');
    const name = `${nameFile}.${nameSplit[nameSplit.length - 1]}`;

    const uploadPath = path.join(
      path.parse(process.cwd()).root,
      'nginx/static',
      folder,
      name
    );

    file.mv(uploadPath, function (err) {
      if (err) {
        reject(err);
      }
      const pathReal = obtenerPathCompleto(uploadPath);
      resolve(pathReal);
    });
  });
};

export const obtenerPathCompleto = (pathServer: string): string => {
  const pathServerSplit = pathServer.split('static\\');
  const pathFileSplit = pathServerSplit[1].split('\\');
  const pathFileJoin = pathFileSplit.join('/');
  const pathInternet = `${process.env.APP_URL}/static-files/${pathFileJoin}`;

  return pathInternet;
};
