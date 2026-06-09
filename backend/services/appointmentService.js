const Appointment = require('../models/Appointment');

const listAppointments = async (query = {}) => {
  return await Appointment.find(query).sort({ appointmentDate: 1 });
};

module.exports = { listAppointments };
