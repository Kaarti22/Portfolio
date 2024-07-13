import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project Title is required"],
  },
  description: String,
  gitRepoLink: {
    type: String,
    required: [true, "GitHub Repo Link is required"],
  },
  projectLink: String,
  technologies: {
    type: String,
    required: [true, "Technologies are required"],
  },
  deployed: String,
  projectBanner: {
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

export const Project = mongoose.model("Project", projectSchema);
