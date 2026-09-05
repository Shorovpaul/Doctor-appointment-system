import { Router, Request, Response } from 'express';
import Patient from '../models/patient';
import Appointment from '../models/appointment';

const router = Router();

// 1. Get All Patients
router.get('/patient-list/get', async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. Create Patient
router.post('/patient/create', async (req: Request, res: Response) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. Get Single Patient Details
router.get('/patient/:id/get', async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 4. Update Patient
router.put('/patient/:id/update', async (req: Request, res: Response) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 5. Delete Patient
router.delete('/patient/:id/delete', async (req: Request, res: Response) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 6. Get All Appointments for a Specific Patient
router.get('/patient/:id/appointment-list/get', async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.id }).populate('doctorId');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;