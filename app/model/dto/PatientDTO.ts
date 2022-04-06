type patientType = "cat" | "dog" | "bird";

export class createPatientDTO {
  petName: string;
  type: patientType;
  owner: {
    name: string;
    address: string;
    phone: number;
  };
  remainingBill: number;
}
