//Defining the Route
const express = require('express');
const checkmodel = require('../models/checkmodel');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const { checkOut, getLogs, checkIn } = require('../controllers/checkcontroller');
const router = express.Router();

/*  
    Route and Method: [POST /api/checklogs/checkout]
    Description: Checkout
    Access: Protected
    Parameters: None
*/
router.post('/checkout', requireAuth, requireRole('security', 'admin'), checkOut);

/*  
    Route and Method: [POST /api/checklogs/checkin]
    Description: Checkin
    Access: Protected
    Parameters: None
*/
router.post('/checkin', requireAuth, requireRole('security', 'admin'), checkIn);
/*  
    Route and Method: [GET /api/checklogs]
    Description: Get a Appointment by their ID
    Access: Protected
    Parameters: None
*/
router.get('/', requireAuth, requireRole('admin', 'security'), getLogs);
module.exports = router