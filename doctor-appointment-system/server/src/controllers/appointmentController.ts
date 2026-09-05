import { Request, Response } from 'express';
import Appointment from '../models/appointment';

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name')
      .populate('doctorId', 'name');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};