import { Router } from 'express';
import Appointment from '../models/appointment';

const router = Router();

// GET ALL: /api/appointment-list/get
router.get('/appointment-list/get', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name')
      .populate('doctorId', 'name');
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST CREATE: /api/appointment/create
router.post('/appointment/create', async (req, res) => {
  try {
    const { patientId, doctorId, problem, appointmentDate } = req.body;

    if (!patientId || !doctorId || !problem || !appointmentDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAppointment = new Appointment({
      patientId,
      doctorId,
      problem,
      appointmentDate: new Date(appointmentDate),
    });

    await newAppointment.save();
    
    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate('patientId', 'name')
      .populate('doctorId', 'name');

    res.status(201).json(populatedAppointment);
  } catch (error: any) {
    console.error('Mongoose Error:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// DELETE: /api/appointment/:id/delete
router.delete('/appointment/:id/delete', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;