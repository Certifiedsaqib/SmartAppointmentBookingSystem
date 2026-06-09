const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    return next(new Error('Invalid resource ID')); 
  }
  next();
};

const validateProviderInput = (req, res, next) => {
  const { name, specialization, email, phone } = req.body;
  if (!name || !specialization || !email || !phone) {
    res.status(400);
    return next(new Error('Provider fields cannot be empty'));
  }
  next();
};

const validateAppointmentInput = (req, res, next) => {
  const { customerName, customerEmail, customerPhone, appointmentDate, providerId } = req.body;
  if (!customerName || !customerEmail || !customerPhone || !appointmentDate || !providerId) {
    res.status(400);
    return next(new Error('Appointment fields cannot be empty'));
  }
  const appointmentTime = new Date(appointmentDate);
  if (isNaN(appointmentTime.getTime()) || appointmentTime < new Date()) {
    res.status(400);
    return next(new Error('Appointment date must be a valid future date'));
  }
  next();
};

module.exports = { validateObjectId, validateProviderInput, validateAppointmentInput };
