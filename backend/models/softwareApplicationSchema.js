import mongoose from "mongoose";

const softwareApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the Software Application is required"],
  },
  svg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const SoftwareApplication = mongoose.model(
  "SoftwareApplication",
  softwareApplicationSchema
);
