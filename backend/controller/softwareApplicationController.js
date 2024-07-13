import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { SoftwareApplication } from "../models/softwareApplicationSchema.js";
import {v2 as cloudinary} from "cloudinary";

export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Software Application Icon/SVG is required", 400)
    );
  }
  const { svg } = req.files;
  const { name } = req.body;

  if (!name) {
    return next(
      new ErrorHandler("Software Application's name is required", 400)
    );
  }

  const cloudinaryResponseForSvg = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "Software Applications" }
  );

  if (!cloudinaryResponseForSvg || cloudinaryResponseForSvg.error) {
    console.error(
      "Cloudinary error: ",
      cloudinaryResponseForSvg.error || "Unknown clodinary error!!!"
    );
  }

  const softwareApplication = await SoftwareApplication.create({
    name,
    svg: {
      public_id: cloudinaryResponseForSvg.public_id,
      url: cloudinaryResponseForSvg.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Software Application added.",
    softwareApplication,
  });
});

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const softwareApplication= await SoftwareApplication.findById(id);
    if(!softwareApplication){
        return next(new ErrorHandler("Software Application not found!", 400));
    }

    const softwareApplicationSvgId = softwareApplication.svg.public_id;
    await cloudinary.uploader.destroy(softwareApplicationSvgId);
    await softwareApplication.deleteOne();
    res.status(200).json({
        success: true,
        message: "Software Application Deleted.",
    });
});

export const getAllApplications = catchAsyncErrors(async (req, res, next) => {
    const softwareApplications = await SoftwareApplication.find();
    res.status(200).json({
        success: true,
        softwareApplications,
    });
});
