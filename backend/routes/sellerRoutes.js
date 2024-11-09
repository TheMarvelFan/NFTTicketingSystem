const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['seller']));

router.post('/create-event', sellerController.createEvent);
router.get('/events', sellerController.getSellerEvents);
router.put('/events/:eventId', sellerController.updateEvent);

module.exports = router;
