import api from './api';
import express from 'express';
let router = express.Router();
router.use('/api', api);
export default router;
