const express = require('express');
const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  patchAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId, validateAppointmentInput } = require('../middleware/validateMiddleware');

const router = express.Router();

router.route('/').get(getAppointments).post(validateAppointmentInput, createAppointment);
router
  .route('/:id')
  .get(validateObjectId, getAppointmentById)
  .put(protect, validateObjectId, validateAppointmentInput, updateAppointment)
  .patch(protect, validateObjectId, patchAppointment)
  .delete(protect, validateObjectId, deleteAppointment);

module.exports = router;
