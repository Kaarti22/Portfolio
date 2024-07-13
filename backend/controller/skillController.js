import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Skill } from "../models/skillSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Skill Icon/SVG is required", 400));
  }
  const { svg } = req.files;
  const { title, proficiency } = req.body;

  if (!title) {
    return next(new ErrorHandler("Please fill the form completely", 400));
  }

  const cloudinaryResponseForSvg = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "Skills" }
  );

  if (!cloudinaryResponseForSvg || cloudinaryResponseForSvg.error) {
    console.error(
      "Cloudinary error: ",
      cloudinaryResponseForSvg.error || "Unknown clodinary error!!!"
    );
  }

  const skill = await Skill.create({
    title,
    proficiency,
    svg: {
      public_id: cloudinaryResponseForSvg.public_id,
      url: cloudinaryResponseForSvg.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Skill added.",
    skill,
  });
});

export const deleteSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found!", 400));
  }

  const skillSvgId = skill.svg.public_id;
  await cloudinary.uploader.destroy(skillSvgId);
  await skill.deleteOne();
  res.status(200).json({
    success: true,
    message: "Skill Deleted.",
  });
});

export const updateSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found!", 400));
  }

  const { proficiency } = req.body;
  skill = await Skill.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Skill updated.",
    skill,
  });
});

export const getAllSkills = catchAsyncErrors(async (req, res, next) => {
  const skills = await Skill.find();
  res.status(200).json({
    success: true,
    skills,
  });
});
