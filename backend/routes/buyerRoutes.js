const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['buyer']));

router.get('/events', buyerController.getEvents);
router.post('/buy-ticket', buyerController.buyTicket);
router.post('/report-event', buyerController.reportEvent);

module.exports = router;
