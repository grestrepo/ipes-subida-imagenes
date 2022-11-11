import { FileArray } from 'express-fileupload';

import { uploadFileHelper, deleteFileHelper } from '../helpers';

export class UploadFileService {
  async uploadImage(files: FileArray, folder = '', nameFile: string) {
    const uploadPath = await uploadFileHelper(files, folder, nameFile);

    return uploadPath;
  }
}

export class DeleteFileService {
  async deleteImage(url: string, path: string) {
    const deletePath = await deleteFileHelper(url, path);

    return deletePath;
  }
}
