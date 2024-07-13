import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar and resume are required!!", 400));
  }
  const { avatar, resume } = req.files;

  const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "Avatar" }
  );

  if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.error(
      "Cloudinary error: ",
      cloudinaryResponseForAvatar.error || "Unknown clodinary error!!!"
    );
  }

  const cloudinaryResponseForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "Resume" }
  );

  if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    console.error(
      "Cloudinary error: ",
      cloudinaryResponseForResume.error || "Unknown clodinary error!!!"
    );
  }

  const {
    fullName,
    email,
    phone,
    about,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    facebookURL,
    twitterURL,
    linkedInURL,
  } = req.body;

  const user = await User.create({
    fullName,
    email,
    phone,
    about,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    facebookURL,
    twitterURL,
    linkedInURL,
    avatar: {
      public_id: cloudinaryResponseForAvatar.public_id,
      url: cloudinaryResponseForAvatar.secure_url,
    },
    resume: {
      public_id: cloudinaryResponseForResume.public_id,
      url: cloudinaryResponseForResume.secure_url,
    },
  });

  generateToken(user, "User registered", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required!!!"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password!!!"));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password!!!"));
  }

  generateToken(user, "Logged In", 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    about: req.body.about,
    portfolioURL: req.body.portfolioURL,
    githubURL: req.body.githubURL,
    instagramURL: req.body.instagramURL,
    facebookURL: req.body.facebookURL,
    twitterURL: req.body.twitterURL,
    linkedInURL: req.body.linkedInURL,
  };
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const profileImageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(profileImageId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      { folder: "Avatar" }
    );
    newUserData.avatar = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeId = user.resume.public_id;
    await cloudinary.uploader.destroy(resumeId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath,
      { folder: "Resume" }
    );
    newUserData.resume = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Profile updated",
    user,
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!confirmNewPassword || !newPassword || !currentPassword) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }
  const user = await User.findById(req.user.id).select("password");
  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect current password", 400));
  }
  if (newPassword != confirmNewPassword) {
    return next(
      new ErrorHandler(
        "New password and confirm new password do not match!!",
        400
      )
    );
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully.",
  });
});

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "6649f9ad005284db9390587a";
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
})