import express from 'express';
import routerKey from './generateKey';

const router = express.Router();
router.use('/key', routerKey);

export default router;
