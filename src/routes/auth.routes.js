
import {Router} from 'express';
const router = Router() 
import * as userController from '../controllers/user.controller'

router.post('/login', userController.login)
router.post('/register', userController.register)
export default router;