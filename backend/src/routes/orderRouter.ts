import {Router} from 'express';
import { listOrders } from '../controllers/orderController.js';
import { getOrder } from '../controllers/orderController.js';
import {createStreamChannel} from '../controllers/orderController.js';
import {createVideoInvite} from '../controllers/orderController.js';

const router = Router();

router.get('/',listOrders);

router.get('/:id',getOrder);

router.post("/:id/stream-channel",createStreamChannel);

router.post("/:id/video-invite",createVideoInvite);
 
export default router;