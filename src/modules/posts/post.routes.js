import { Router } from "express";
const router = Router();
import * as postController from './post.controller.js';

router.post('/create', postController.create);
router.get('/reading', postController.reading);
router.put('/updating', postController.updating);
router.patch('/deleting', postController.deleting);





export default router;
