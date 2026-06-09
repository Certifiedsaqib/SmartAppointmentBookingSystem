const asyncHandler = require('express-async-handler');
const Appointment = require('../models/Appointment');
const Provider = require('../models/Provider');
const { successResponse } = require('../utils/apiResponse');

const getAppointments = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.customerName) {
    query.customerName = { $regex: req.query.customerName, $options: 'i' };
  }
  if (req.query.providerId) {
    query.providerId = req.query.providerId;
  }
  if (req.query.appointmentDate) {
    const date = new Date(req.query.appointmentDate);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    query.appointmentDate = { $gte: date, $lt: nextDay };
  }
  const appointments = await Appointment.find(query)
    .populate('providerId', 'name specialization email phone')
    .sort({ appointmentDate: 1 });
  return successResponse(res, 'Appointments fetched successfully', appointments);
});

const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate('providerId', 'name specialization email phone');
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }
  return successResponse(res, 'Appointment details loaded', appointment);
});

const createAppointment = asyncHandler(async (req, res) => {
  const { customerName, customerEmail, customerPhone, appointmentDate, providerId, notes, status } = req.body;
  const provider = await Provider.findById(providerId);
  if (!provider) {
    res.status(400);
    throw new Error('Selected provider does not exist');
  }
  const appointment = await Appointment.create({
    customerName,
    customerEmail,
    customerPhone,
    appointmentDate,
    providerId,
    notes,
    status: status || 'pending',
  });
  return successResponse(res, 'Appointment created successfully', appointment, 201);
});

const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }
  Object.assign(appointment, req.body);
  await appointment.save();
  return successResponse(res, 'Appointment updated successfully', appointment);
});

const patchAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }
  Object.assign(appointment, req.body);
  await appointment.save();
  return successResponse(res, 'Appointment patched successfully', appointment);
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  if (req.user.role === 'admin' && req.user.providerId) {
    if (appointment.providerId.toString() !== req.user.providerId.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this appointment');
    }
  } else if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Admin access required');
  }

  await appointment.remove();
  return successResponse(res, 'Appointment deleted successfully');
});

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  patchAppointment,
  deleteAppointment,
};
