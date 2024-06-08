import mongoose, { Schema } from 'mongoose';

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: String,
  lastName: String,
  doj: String,
  title: String,
  department: String,
  employeeType: String,
  currentStatus: String,
});

export const Employee = mongoose.model('Employee', EmployeeSchema);
