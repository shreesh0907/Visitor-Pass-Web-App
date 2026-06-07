const Visitor = require("../models/visitormodel");
const Appointment = require("../models/appointmentmodel");
const Pass = require("../models/passModel");
const Check = require("../models/checkmodel");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const activePasses = await Pass.countDocuments({ status: "active" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayCheckIns = await Check.countDocuments({
      type: "check-in",
      time: { $gte: today, $lt: tomorrow },
    });

    const todayCheckOuts = await Check.countDocuments({
      type: "check-out",
      time: { $gte: today, $lt: tomorrow },
    });

    res.status(200).json({
      success: true,
      data: {
        totalVisitors,
        totalAppointments,
        activePasses,
        todayCheckIns,
        todayCheckOuts,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};