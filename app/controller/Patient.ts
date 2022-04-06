import { Model } from "mongoose";
import { MessageUtil } from "../utils/message";
import { PatientService } from "../service/Patients";
import { createPatientDTO } from "../model/dto/PatientDTO";

export class PatientController extends PatientService {
  constructor(patients: Model<any>) {
    super(patients);
  }

  /**
   * Create patient
   * @param {*} event
   */
  async create(event: any) {
    const params: createPatientDTO = JSON.parse(event.body);

    try {
      const result = await this.createPatient({
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
    const body: createPatientDTO = JSON.parse(event.body);

    if (!_id) {
      return MessageUtil.error(400, "_id is required");
    }
    try {
      const result = await this.updatePatient(_id, body);
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
      const result = await this.findPatients();

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
      const result = await this.findOnePatientById(_id);

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
      const result = await this.deleteOnePatientById(_id);

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

  async getPopularPatient() {
    try {
      const result = await this.popularPet();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
