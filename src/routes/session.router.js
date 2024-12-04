import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

const router = Router();

//Ruta de registro

router.post('/register', UserController.register);

//Ruta de login
router.post('/login', UserController.login);

//Ruta protegida

router.get('/current', passport.authenticate('jwt', { session: false}), UserController.current);


//Ruta de autenticacion actual con JWT
router.get('/api/sessions/current', passport.authenticate('jwt', {session: false}), UserController.current);

//Logout

router.post('/logout', UserController.logout);

export default router;
