const express = require('express');
const {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  patchProvider,
  getProviderAppointmentCount,
  deleteProvider,
} = require('../controllers/providerController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateObjectId, validateProviderInput } = require('../middleware/validateMiddleware');

const router = express.Router();

router.route('/').get(getProviders).post(protect, admin, validateProviderInput, createProvider);
router.get('/:id/appointment-count', validateObjectId, getProviderAppointmentCount);
router
  .route('/:id')
  .get(validateObjectId, getProviderById)
  .put(protect, admin, validateObjectId, validateProviderInput, updateProvider)
  .patch(protect, admin, validateObjectId, patchProvider)
  .delete(protect, admin, validateObjectId, deleteProvider);

module.exports = router;
