import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  phone: string;
  age?: number;
  gender?: string;
  specialization: string;
}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  specialization: { type: String, required: true },
});

const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor; // <-- এই Export Default-টি অত্যন্ত জরুরি