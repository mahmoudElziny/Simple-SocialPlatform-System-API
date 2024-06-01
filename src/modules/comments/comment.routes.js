import { Router } from "express";
const router = Router();
import * as commentController from './comment.controller.js';

router.post('/create', commentController.create);
router.get('/reading', commentController.reading);
router.put('/updating', commentController.updating);
router.patch('/deleting', commentController.deleting);



export default router;
