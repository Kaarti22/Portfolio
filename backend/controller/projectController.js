import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner Image is required", 400));
  }

  const { projectBanner } = req.files;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    deployed,
  } = req.body;

  const cloudinaryResponseForProjectBanner = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    { folder: "Project images" }
  );
  if (
    !cloudinaryResponseForProjectBanner ||
    cloudinaryResponseForProjectBanner.error
  ) {
    console.error(
      "Cloudinary Error: ",
      cloudinaryResponseForProjectBanner.error || "Unknown Cloudinary Error"
    );
    return next(
      new ErrorHandler("Failed to upload project banner to cloudinary!", 500)
    );
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponseForProjectBanner.public_id,
      url: cloudinaryResponseForProjectBanner.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New Project created.",
    project,
  });
});

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }

  await project.deleteOne();
  res.status(200).json({
    success: true,
    message: "Project deleted",
  });
});

export const updateProject = catchAsyncErrors(async (req, res, next) => {
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    gitRepoLink: req.body.gitRepoLink,
    projectLink: req.body.projectLink,
    technologies: req.body.technologies,
    deployed: req.body.deployed,
  };

  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);
    const projectBannerId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectBannerId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      { folder: "Project images" }
    );
    newProjectData.projectBanner = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    newProjectData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Project updated",
    project,
  });
});

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }
  res.status(200).json({
    success: true,
    project,
  });
});
