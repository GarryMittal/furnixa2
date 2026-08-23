import {Router} from 'express';
import { createCheckout } from '../controllers/checkoutController.js';

const router = Router();


// router.post("/", (req, res, next) => {
//   console.log("Checkout route hit");
//   next();
// }, createCheckout);

router.post('/',createCheckout)

export default router;