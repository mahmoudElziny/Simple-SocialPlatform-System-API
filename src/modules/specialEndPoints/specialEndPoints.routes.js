import { Router } from "express";
const router = Router();
import * as specialController from './specialEndPoints.controller.js';

router.get('/specificUserWithSpecificPostAndComments', specialController.specificUserWithSpecificPostAndComments);
router.get('/specificPostWithTheAuthor', specialController.specificPostWithTheAuthor);


export default router;
