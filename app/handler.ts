import dotenv from "dotenv";
import path from "path";
const dotenvPath = path.join(
  __dirname,
  "../",
  `config/.env.${process.env.NODE_ENV}`
);
dotenv.config({
  path: dotenvPath,
});

import { Patients } from "./model";
import { PatientController } from "./controller/Patient";
import { Handler } from "aws-lambda";

const patientController = new PatientController(Patients);

import { Appointments } from "./model";
import { AppointmentController } from "./controller/Appointments";

const appointmentController = new AppointmentController(Appointments);

export const createPatient: Handler = (event: any) => {
  return patientController.create(event);
};

export const updatePatient: Handler = (event: any) =>
  patientController.update(event);

export const findPatients: Handler = () => patientController.find();

export const findOnePatient: Handler = (event: any) => {
  return patientController.findOne(event);
};

export const deleteOnePatient: Handler = (event: any) =>
  patientController.deleteOne(event);

export const createAppointment: Handler = (event: any) => {
  return appointmentController.create(event);
};

export const updateAppointment: Handler = (event: any) =>
  appointmentController.update(event);

export const findAppointments: Handler = () => appointmentController.find();

export const findAppointmentByPatientId: Handler = (event: any) => {
  return appointmentController.findByPatientId(event);
};

export const findOneAppointment: Handler = (event: any) => {
  return appointmentController.findOne(event);
};

export const deleteOneAppointment: Handler = (event: any) =>
  appointmentController.deleteOne(event);

export const findAllRecordsForToday: Handler = () => {
  return appointmentController.findAllRecordsForToday();
};

export const listOfAllUnpaid: Handler = () => {
  return appointmentController.listOfAllUnpaid();
};

export const viewBalances: Handler = (event: any) => {
  return appointmentController.viewBalances(event);
};
export const getPopularPatient: Handler = () => {
  return patientController.getPopularPatient();
};
