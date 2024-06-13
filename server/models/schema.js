import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  age: { type: Number, required: true },
  doj: { type: Date, default: new Date(), required: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
  employeeType: { type: String, required: true },
  currentStatus: { type: Number, default: 1, required: true },
});

export const Employee = mongoose.model('Employee', EmployeeSchema);
