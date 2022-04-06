import Mongoose from "mongoose";
import { Schema } from "mongoose";

type currency = "USD" | "EUR" | "BTC";

export type BillDocument = Mongoose.Document & {
  appointmentId: string;
  patientId: string;
  totalFee: number;
  amountPaid: number;
  remainingAmount: number;
  currency: currency;
};

const BillSchema = new Mongoose.Schema({
  patientId: { type: Schema.Types.ObjectId, ref: "Patients", required: true },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "Appointments",
    required: true,
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
  createdAt: { type: Date, default: Date.now },
});

// export const Bills =
//   Mongoose.models["Bills"] ||
//   Mongoose.model<BillDocument>("Bills", BillSchema, "Bills");

export const Bills =
  Mongoose.models["Bills"] || Mongoose.model("Bills", BillSchema);
