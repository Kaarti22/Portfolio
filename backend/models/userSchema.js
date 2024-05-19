import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required!"],
  },
  email: {
    type: String,
    required: [true, "Email Required!"],
  },
  phone: {
    type: String,
    required: [true, "Phone number Required!"],
  },
  about: {
    type: String,
    required: [true, "About field Required!"],
  },
  password: {
    type: String,
    required: [true, "Password Required!"],
    minLength: [8, "Password must contain atleast 8 characters!"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioURL: {
    type: String,
    required: [true, "Portfolio URL is required!"],
  },
  githubURL: String,
  instagramURL: String,
  facebookURL: String,
  twitterURL: String,
  linkedInURL: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// for hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// for comparing password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generating JSON web token
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
