type currency = "USD" | "EUR" | "BTC";

export class createAppointmentDTO {
  patientId: string;
  startTime: Date;
  entTime: Date;
  description: string;
  totalFee: number;
  amountPaid: number;
  //   remainingAmount: number;
  currency: currency;
}
