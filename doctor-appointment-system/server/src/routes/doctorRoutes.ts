import { Router, Request, Response } from 'express';
import Doctor from '../models/doctor';
import Appointment from '../models/appointment';

const router = Router();

// 1. Get All Doctors
router.get('/doctor-list/get', async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. Create Doctor
router.post('/doctor/create', async (req: Request, res: Response) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. Get Single Doctor Details
router.get('/doctor/:id/get', async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 4. Update Doctor
router.put('/doctor/:id/update', async (req: Request, res: Response) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 5. Delete Doctor
router.delete('/doctor/:id/delete', async (req: Request, res: Response) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 6. Get All Appointments for a Specific Doctor
router.get('/doctor/:id/appointment-list/get', async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.id }).populate('patientId');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;