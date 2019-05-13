import express from 'express';
import verification from './verification';
import info from './info';
const router = express.Router();
router.use('/verification', verification);
router.use('/info', info);
export default router;
