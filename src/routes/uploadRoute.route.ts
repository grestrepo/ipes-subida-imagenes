import { Router } from 'express';

import { uploadFileController, deleteFileController } from '../controllers';
import { validarImagenes, validarJWT } from '../middlewares';

const router = Router();

router.delete('/files', [validarJWT], deleteFileController);
router.post('/files', [validarJWT, validarImagenes], uploadFileController);

export default router;
