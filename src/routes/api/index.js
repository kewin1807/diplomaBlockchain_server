import express from 'express';
import verification from './verification';
import info from './info';
import diploma from './diploma';
const router = express.Router();
router.use('/verification', verification);
router.use('/info', info);
router.use('/diploma', diploma);
export default router;
