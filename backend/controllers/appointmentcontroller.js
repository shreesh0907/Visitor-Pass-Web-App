//Import the Model
const appointment = require('../models/appointmentmodel')

//CREATE AN APPOINTMENT
exports.createAppointment = async(req,res) => {
    const {visitor, host, visitDate, purpose, status} = req.body;
        if(!visitor || !host || !visitDate || !purpose){
        return res.status(400).json({
          success: false,
          error: 'Please fill all the fields'
        })
        }
        try {
        const Appointment = await appointment.create(req.body)
        res.status(200).json({
               success: true,
               data: Appointment
            })
        }
        catch(error){
            res.status(400).json({
                error: error.message
            })
        }
}

//GET ALL APPOINTMENTS
exports.getAllAppointments = async(req,res) => {
try{
const Appointment = await appointment.find().populate('visitor').populate('host')
     res.status(200).json({
           success: true,
           data: Appointment
        })
   }
   catch(error){
    res.status(400).json({
                error: error.message
    })
   }
}

//GET AN APPOINTMENT DETAILS BY THEIR ID
exports.getAppointmentById = async(req,res) => {
try {
const {id} = req.params
const Appointment = await appointment.findById(id).populate('visitor').populate('host')
    res.status(200).json({
           success: true,
           data: Appointment
        })
}
catch (error) {
 res.status(400).json({
    error: error.message
})
}
}

//UPDATE AN APPOINTMENT BY THEIR ID 
exports.updateAppointmentById = async(req,res) => {
try{
const {id} = req.params,
{data} = req.body
const Appointment = await appointment.findByIdAndUpdate(id, data, {returnDocument: 'after'})
    res.status(200).json({
           success: true,
           data: Appointment
        })
    }
catch(error) {
    res.status(400).json({
    error: error.message
})
}
}

//DELETE AN APPOINTMENT BY THEIR ID
exports.deleteAppointmentById = async(req,res) => {
try{
const {id} = req.params
const Appointment = await appointment.findByIdAndDelete(id)
    res.status(200).json({
           success: true,
           data: Appointment
        })
}
catch(error){
res.status(400).json({
error: error.message
})
}
}