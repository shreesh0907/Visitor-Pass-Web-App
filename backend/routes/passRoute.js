const express = require('express');
const visitormodel = require('../models/visitormodel');
const pass = require('../models/passModel')
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const {createPass, getAllPasses, getPassById, updatePassById, deletePassById} = require('../controllers/passcontroller');

const router = express.Router();

/*  
    Route and Method: [POST /api/passes]
    Description: Create a pass
    Access: Public
    Parameters: None
*/
router.post('/', requireAuth, requireRole('security', 'admin'), createPass);
/*  
    Route and Method: [GET /api/passes]
    Description: Get all passes
    Access: Public
    Parameters: None
*/
router.get('/', requireAuth, requireRole('admin', 'security'), getAllPasses);

/*  
    Route and Method: [GET /api/passes/:id]
    Description: Get a Pass by ID
    Access: Public
    Parameters: ID
*/
router.get('/:id', requireAuth, requireRole('admin', 'security'), getPassById);

/*  
    Route and Method: [PUT /api/passes/:id]
    Description: Update a Pass by ID
    Access: Public
    Parameters: ID
*/
router.put('/:id', requireAuth, requireRole('admin', 'security'), updatePassById);

/*  
    Route and Method: [DELETE /api/passes/:id]
    Description: Delete a Pass by ID
    Access: Public
    Parameters: ID
*/
router.delete("/:id", requireAuth, requireRole("admin"), deletePassById);
module.exports = router