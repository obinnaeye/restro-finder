import mongoose from "mongoose";
import { nanoid } from "nanoid";

export interface RestroDocument extends mongoose.Document {
  name: string;
  address: string;
  latitude: number,
  longitude: number,
  createdAt: Date;
  updatedAt: Date;
}

const RestroSchema = new mongoose.Schema(
  {
    restroId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { timestamps: true }
);

const Restro = mongoose.model<RestroDocument>("Restro", RestroSchema);

export default Restro;
