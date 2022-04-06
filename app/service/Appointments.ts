import moment from "momnet";
import { Model } from "mongoose";
import { Patients } from "../model";
import { createAppointmentDTO } from "../model/dto/Appointments";

export class AppointmentService {
  private appointments: Model<any>;

  constructor(appointments: Model<any>) {
    this.appointments = appointments;
  }

  protected async createAppointment(
    params: createAppointmentDTO
  ): Promise<object> {
    try {
      const result = await this.appointments.create({
        ...params,
        remainingAmount: params.totalFee - params.amountPaid,
      });

      const { patientId } = result;
      await Patients.findOneAndUpdate(
        { _id: patientId },
        {
          $inc: {
            remainingBill: params.totalFee - params.amountPaid,
            totalBill: params.totalFee,
          },
        }
      );

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  protected updateAppointment(_id: String, data: object) {
    return this.appointments.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );
  }

  protected findAppointments() {
    return this.appointments.find();
  }

  protected findAppointmentsByPatientId(patientId) {
    return this.appointments.find({ patientId });
  }

  protected async findOneAppointmentById(_id: String): Promise<object> {
    return this.appointments.findOne({ _id });
  }

  protected deleteOneAppointmentById(_id: String) {
    return this.appointments.deleteOne({ _id });
  }
  protected findAllRecordsToday() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return this.appointments.find({ createdAt: { $gt: today } });
  }

  protected allUnpaid() {
    return this.appointments.find({ remainingAmount: { $gt: 0 } });
  }

  protected async viewBalance(numberOfDays) {
    if (!numberOfDays) {
      numberOfDays = 7;
    }

    let appointments = await this.appointments.find({
      createdAt: {
        $gt: moment().add(-numberOfDays, "days"),
      },
    });
    let paid = 0,
      unpaid = 0,
      totalAmounts = 0;

    appointments.forEach((appointment) => {
      paid = paid + (appointment.amountPaid || 0);
      unpaid = unpaid + (appointment.remainingAmount || 0);
      totalAmounts = totalAmounts + (appointment.totalFee || 0);
    });
    return { paid, unpaid, totalAmounts };
  }
}
