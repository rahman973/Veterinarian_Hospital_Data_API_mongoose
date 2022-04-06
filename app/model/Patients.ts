import Mongoose from "mongoose";
type patientType = "cat" | "dog" | "bird";

export type PatientDocument = Mongoose.Document & {
  petName: string;
  type: patientType;
  owner: {
    name: string;
    address: string;
    phone: number;
  };
  remainingBill: number;
  totalBill: number;
};

const PatientSchema = new Mongoose.Schema({
  petName: { type: String, default: null },
  type: { type: String, default: null },
  owner: {
    name: { type: String, default: null },
    address: { type: String, default: null },
    phone: { type: Number, default: null },
  },
  remainingBill: { type: Number, default: 0 },
  totalBill: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Patients =
  Mongoose.models["Patients"] ||
  Mongoose.model<PatientDocument>("Patients", PatientSchema, "Patients");
// const Patients = Mongoose.model("Patients", PatientSchema);
export default Patients;
