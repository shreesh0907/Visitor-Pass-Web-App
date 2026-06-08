//Defining the Route
const express = require('express');
const visitormodel = require('../models/visitormodel');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const { createVisitor, getAllVisitors, getVisitorById, updateVisitorById, deleteVisitorById } = require('../controllers/visitorController');
const router = express.Router();

/*  
    Route and Method: [POST /api/visitors]
    Description: Create a visitor
    Access: Protected
    Parameters: None
*/
router.post('/', requireAuth, requireRole('security', 'admin'), createVisitor);
/*  
    Route and Method: [GET /api/visitors]
    Description: Get all the visitors
    Access: Protected
    Parameters: None
*/
router.get('/', requireAuth, requireRole('admin', 'security'), getAllVisitors);

/*  
    Route and Method: [GET /api/visitors/:id]
    Description: Get a Visitor by their ID
    Access: Public
    Parameters: ID
*/
router.get('/:id', requireAuth, requireRole('admin', 'security'), getVisitorById);

/*  
    Route and Method: [PUT /api/visitors/:id]
    Description: Update a Visitor by their ID
    Access: Protected
    Parameters: ID
*/
router.put('/:id', requireAuth, requireRole('security', 'admin'), updateVisitorById);


/*  
    Route and Method: [DELETE /api/visitors/:id]
    Description: Delete a Visitor by their ID
    Access: Protected
    Parameters: ID
*/
router.delete('/:id', requireAuth, requireRole('admin'), deleteVisitorById);
module.exports = router