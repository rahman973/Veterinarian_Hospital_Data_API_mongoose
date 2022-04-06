import { Model } from "mongoose";
import { MessageUtil } from "../utils/message";
import { AppointmentService } from "../service/Appointments";
// import { createAppointmentDTO } from "../model/dto/AppointmentDTO";
import { createAppointmentDTO } from "../model/dto/Appointments";

export class AppointmentController extends AppointmentService {
  constructor(patients: Model<any>) {
    super(patients);
  }

  /**
   * Create patient
   * @param {*} event
   */
  async create(event: any) {
    const params: createAppointmentDTO = JSON.parse(event.body);

    try {
      const result = await this.createAppointment({
        ...params,
      });

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Update a patient by id
   * @param event
   */
  async update(event: any) {
    const _id: String = event.pathParameters._id;
    const body: createAppointmentDTO = JSON.parse(event.body);

    if (!_id) {
      return MessageUtil.error(400, "_id is required");
    }
    try {
      const result = await this.updateAppointment(_id, body);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find patient list
   */
  async find() {
    try {
      const result = await this.findAppointments();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query patient by id
   * @param event
   */
  async findOne(event: any) {
    const _id: String = event.pathParameters._id;
    try {
      const result = await this.findOneAppointmentById(_id);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query patient by id
   * @param event
   */
  async findByPatientId(event: any) {
    const patientId: String = event.pathParameters.patientId;
    try {
      const result = await this.findAppointmentsByPatientId(patientId);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete patient by id
   * @param event
   */
  async deleteOne(event: any) {
    const _id: String = event.pathParameters._id;

    try {
      const result = await this.deleteOneAppointmentById(_id);

      if (result.deletedCount === 0) {
        return MessageUtil.error(
          1010,
          "The data was not found! May have been deleted!"
        );
      }

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async findAllRecordsForToday() {
    try {
      const result = await this.findAllRecordsToday();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async listOfAllUnpaid() {
    try {
      const result = await this.allUnpaid();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async viewBalances(event: any) {
    const days: String = event?.queryStringParameters?.days;
    try {
      const result = await this.viewBalance(days);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
