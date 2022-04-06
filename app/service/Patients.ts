import { Model } from "mongoose";
import { createPatientDTO } from "../model/dto/PatientDTO";

export class PatientService {
  private patients: Model<any>;
  constructor(patients: Model<any>) {
    this.patients = patients;
  }
  protected async createPatient(params: createPatientDTO): Promise<object> {
    try {
      const result = await this.patients.create({
        ...params,
      });
      return result;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }
  protected updatePatient(_id: String, data: object) {
    return this.patients.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );
  }

  protected findPatients() {
    return this.patients.find();
  }

  protected findOnePatientById(_id: String) {
    return this.patients.findOne({ _id });
  }

  protected deleteOnePatientById(_id: String) {
    return this.patients.deleteOne({ _id });
  }

  protected popularPet() {
    return this.patients.find({}).sort({ totalBill: -1 });
  }
}
