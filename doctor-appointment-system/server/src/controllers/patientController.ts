import { Request, Response } from 'express';
import Patient from '../models/patient';

// Get All Patients
export const getPatients = async (req: Request, res: Response): Promise<void> => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.status(200).json(patients);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create Patient
export const createPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, age, gender } = req.body;
    const newPatient = new Patient({ name, phone, age: Number(age), gender });
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update Patient
export const updatePatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPatient);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Patient
export const deletePatient = async (req: Request, res: Response): Promise<void> => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};