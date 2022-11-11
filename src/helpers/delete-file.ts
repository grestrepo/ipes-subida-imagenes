import systemPath from 'path';
import fs from 'fs';

type TResponse = {
  code: 200 | 404 | 400;
  message: string;
};

export const deleteFileHelper = async (
  url: string,
  path: string
): Promise<TResponse> => {
  if (url.includes('domiciliosplazas.ipes.gov.co/static-files')) {
    try {
      const fileName = url.split('/').pop() ?? '';

      const removePath = systemPath.join(
        systemPath.parse(process.cwd()).root,
        'nginx/static',
        path,
        fileName
      );

      await fs.unlinkSync(removePath);

      return { code: 200, message: 'File removed' };
    } catch (e) {
      console.error('File not found', e);
      return { code: 404, message: 'File not found' };
    }
  }

  return { code: 400, message: 'File no exist on this server' };
};
