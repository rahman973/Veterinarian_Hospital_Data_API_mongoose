import Mongoose from "mongoose";
import { Schema } from "mongoose";
type currency = "USD" | "EUR" | "BTC";

export type AppointmentDocument = Mongoose.Document & {
  patientId: string;
  startTime: Date;
  entTime: Date;
  description: string;
  totalFee: number;
  amountPaid: number;
  remainingAmount: number;
  currency: currency;
};

const AppointmentSchema = new Mongoose.Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patients", required: true },
    startTime: { type: Date, default: null },
    entTime: { type: Date, default: null },
    description: {
      type: String,
      default: null,
    },
    totalFee: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    remainingAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "BTC"],
      default: "USD",
    },

    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

// export const Appointments =
//   Mongoose.models["Appointments"] ||
//   Mongoose.model<AppointmentDocument>(
//     "Appointments",
//     AppointmentSchema,
//     "Appointments"
//   );

export const Appointments =
  Mongoose.models["Appointments"] ||
  Mongoose.model("Appointments", AppointmentSchema);
