const Pass = require('../models/passModel')
const Check = require('../models/checkmodel')

//CHECK IN CONTROLLER
exports.checkIn = async (req, res) => {
    const { passId } = req.body
    try {
        //If pass not found
        const pass = await Pass.findById(passId)
        if (!pass) {
            return res.status(404).json({
                success: false,
                error: "Pass not found"
            })
        }

        //If Already Checked in
        const alreadyCheckedIn = await Check.findOne({
            pass: passId,
            type: "check-in"
        })
        if (alreadyCheckedIn) {
            return res.status(400).json({
                success: false,
                error: "Already checked in"
            })
        }

        //Log Generator
        const log = await Check.create({
            pass: passId,
            visitor: pass.visitor,
            type: "check-in",
            scannedBy: req.user._id
        })

        pass.status = "inside"
        await pass.save()

        res.status(200).json({
            success: true,
            data: log
        })

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

//CHECK OUT CONTROLLER
exports.checkOut = async (req, res) => {
    const { passId } = req.body
    //If pass not found
    try {
        const pass = await Pass.findById(passId)

        if (!pass) {
            return res.status(404).json({
                success: false,
                error: "Pass not found"
            })
        }

    //If not checked in
        const checkInExists = await Check.findOne({
            pass: passId,
            type: "check-in"
        })
        if (!checkInExists) {
            return res.status(400).json({
                success: false,
                error: "Visitor has not checked in"
            })
        }

    //If already checked out
        const alreadyCheckedOut = await Check.findOne({
            pass: passId,
            type: "check-out"
        })
        if (alreadyCheckedOut) {
            return res.status(400).json({
                success: false,
                error: "Already checked out"
            })
        }

    //Log Generator
        const log = await Check.create({
            pass: passId,
            visitor: pass.visitor,
            type: "check-out",
            scannedBy: req.user._id
        })

        pass.status = "completed"
        await pass.save()

        res.status(200).json({
            success: true,
            data: log
        })

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

//GET ALL THE LOGS
exports.getLogs = async (req, res) => {
    try {
        const logs = await Check.find()
            .populate('pass')
            .populate('visitor')
            .populate('scannedBy')

        res.status(200).json({
            success: true,
            data: logs
        })

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}