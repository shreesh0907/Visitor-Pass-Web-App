//Import the Model and QR Package
const pass = require('../models/passModel')
const QRCode = require('qrcode')

//CREATE A PASS
exports.createPass = async(req,res) => {
    const {visitor, appointment, issueDate, expiryDate} = req.body;
    try {
        if(!visitor || !appointment || !issueDate || !expiryDate){
        return res.status(400).json({
          success: false,
          error: 'Please fill all the fields'
        })
        }
        const passNumber = `PASS-${Date.now()}`
        const newPass = await pass.create({visitor, appointment, passNumber, issueDate, expiryDate, status: "active"})
        const qrCode = await QRCode.toDataURL(newPass._id.toString())
        newPass.qrcode = qrCode
        await newPass.save()
        res.status(200).json({
               success: true,
               data: newPass
            })
        }
        catch(error){
            res.status(400).json({
                error: error.message
            })
        }
}

//GET ALL PASSES
exports.getAllPasses = async(req,res) => {
try{
const Pass = await pass.find().populate('visitor').populate('appointment')
     res.status(200).json({
           success: true,
           data: Pass
        })
   }
   catch(error){
    res.status(400).json({
                error: error.message
    })
   }
}

//GET A PASS BY THEIR ID
exports.getPassById = async(req,res) => {
try {
const {id} = req.params
const Pass = await pass.findById(id).populate('visitor').populate('appointment');
if (!Pass) {
return res.status(404).json({
    success: false,
    error: "Pass not found"
})
}
res.status(200).json({
    success: true,
    data: Pass
});

}
catch (error) {
 res.status(400).json({
    error: error.message
})
}
}

//UPDATE A PASS BY THEIR ID 
exports.updatePassById = async(req,res) => {
try{
const {id} = req.params,
{data} = req.body
const Pass = await pass.findByIdAndUpdate(id, data, {returnDocument: 'after'})
if (!Pass) {
    return res.status(404).json({
        success: false,
        error: "Pass not found"
    })
res.status(200).json({
    success: true,
    data: Pass
})

}
    }
catch(error) {
    res.status(400).json({
    error: error.message
})
}
}

//DELETE A PASS BY THEIR ID
exports.deletePassById = async (req, res) => {
  try {
    const { id } = req.params;

    const Pass = await pass.findByIdAndDelete(id);

    if (!Pass) {
      return res.status(404).json({
        success: false,
        error: "Pass not found",
      });
    }

    res.status(200).json({
      success: true,
      data: Pass,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};