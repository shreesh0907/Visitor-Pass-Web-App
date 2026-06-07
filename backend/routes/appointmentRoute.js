const express = require('express');
const visitormodel = require('../models/visitormodel');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const { createAppointment, getAllAppointments, getAppointmentById, updateAppointmentById, deleteAppointmentById } = require('../controllers/appointmentcontroller');
const router = express.Router();

/*  
    Route and Method: [POST /api/appointments]
    Description: Create a visitor
    Access: Public
    Parameters: None
*/
router.post('/', requireAuth, requireRole('employee', 'admin'), createAppointment)

/*  
    Route and Method: [GET /api/appointments]
    Description: Get all the visitors
    Access: Public
    Parameters: None
*/
router.get('/', requireAuth, requireRole('admin', 'employee', 'security'), getAllAppointments)

/*  
    Route and Method: [GET /api/appointments/:id]
    Description: Get a Appointment by their ID
    Access: Public
    Parameters: ID
*/
router.get('/:id', requireAuth, requireRole('admin', 'employee', 'security'), getAppointmentById)

/*  
    Route and Method: [PUT /api/appointments/:id]
    Description: Update an Appointment by their ID
    Access: Public
    Parameters: ID
*/
router.put('/:id', requireAuth, requireRole('employee', 'admin'), updateAppointmentById)


/*  
    Route and Method: [DELETE /api/appointments/:id]
    Description: Delete an Appointment by their ID
    Access: Public
    Parameters: ID
*/
router.delete('/:id', requireAuth, requireRole('admin'), deleteAppointmentById)

module.exports = router