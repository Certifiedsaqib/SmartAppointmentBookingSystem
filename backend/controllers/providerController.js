const asyncHandler = require('express-async-handler');
const Provider = require('../models/Provider');
const Appointment = require('../models/Appointment');
const { successResponse } = require('../utils/apiResponse');

const getProviders = asyncHandler(async (req, res) => {
  const providers = await Provider.find().sort({ createdAt: -1 });
  return successResponse(res, 'Providers fetched successfully', providers);
});

const getProviderById = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id);
  if (!provider) {
    res.status(404);
    throw new Error('Provider not found');
  }
  return successResponse(res, 'Provider details loaded', provider);
});

const createProvider = asyncHandler(async (req, res) => {
  const { name, specialization, email, phone } = req.body;
  const provider = await Provider.create({ name, specialization, email, phone });
  return successResponse(res, 'Provider created successfully', provider, 201);
});

const updateProvider = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id);
  if (!provider) {
    res.status(404);
    throw new Error('Provider not found');
  }
  provider.name = req.body.name || provider.name;
  provider.specialization = req.body.specialization || provider.specialization;
  provider.email = req.body.email || provider.email;
  provider.phone = req.body.phone || provider.phone;
  await provider.save();
  return successResponse(res, 'Provider updated successfully', provider);
});

const patchProvider = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id);
  if (!provider) {
    res.status(404);
    throw new Error('Provider not found');
  }
  Object.assign(provider, req.body);
  await provider.save();
  return successResponse(res, 'Provider patched successfully', provider);
});

const getProviderAppointmentCount = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id);
  if (!provider) {
    res.status(404);
    throw new Error('Provider not found');
  }

  const count = await Appointment.countDocuments({ providerId: req.params.id });
  return successResponse(res, 'Appointment count loaded', { providerId: req.params.id, count });
});

const deleteProvider = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id);
  if (!provider) {
    res.status(404);
    throw new Error('Provider not found');
  }
  await provider.remove();
  return successResponse(res, 'Provider deleted successfully');
});

module.exports = {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  patchProvider,
  getProviderAppointmentCount,
  deleteProvider,
};
