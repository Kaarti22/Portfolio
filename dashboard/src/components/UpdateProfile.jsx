import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from "@/store/slices/userSlice.js";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );
  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(
    user && (user.phone === "undefined" ? "" : user.phone)
  );
  const [about, setAbout] = useState(
    user && (user.about === "undefined" ? "" : user.about)
  );
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [twitterURL, setTwitterURL] = useState(
    user && (user.twitterURL === "undefined" ? "" : user.twitterURL)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === "undefined" ? "" : user.facebookURL)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  const dispatch = useDispatch();

  const avatarHandler = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("about", about);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("facebookURL", facebookURL);
    formData.append("twitterURL", twitterURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if(error){
        toast.error(error);
        dispatch(clearAllUserErrors());
    }
    if(isUpdated){
        dispatch(getUser());
        dispatch(resetProfile());
    }
    if(message){
        toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated, message]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p className="mb-5">Update Your Profile</p>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Profile Image</Label>
                <img
                  src={avatarPreview ? `${avatarPreview}` : `./vite.svg`}
                  alt="Avatar"
                  className="w-full h-auto sm:w-72 rounded-2xl"
                />
                <div className="relative">
                  <input
                    type="file"
                    className="avatar-update-btn"
                    onChange={avatarHandler}
                  />
                </div>
              </div>
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Resume</Label>
                <Link
                  to={user && user.resume && user.resume.url}
                  target="_blank"
                >
                  <img
                    src={resumePreview ? resumePreview : "./vite.svg"}
                    alt="Resume"
                    className="w-full h-auto sm:w-72 rounded-2xl"
                  />
                </Link>
                <div className="relative">
                  <input
                    type="file"
                    className="avatar-update-btn"
                    onChange={resumeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Your Full Name"
                value={fullName}
                onChange={(ev) => setFullName(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                type="text"
                placeholder="Your Phone"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>About Me</Label>
              <Textarea
                placeholder="Tell about yourself"
                value={about}
                onChange={(ev) => setAbout(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Portfolio URL</Label>
              <Input
                placeholder="Enter your Portfolio URL"
                value={portfolioURL}
                onChange={(ev) => setPortfolioURL(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>GitHub URL</Label>
              <Input
                placeholder="Enter your GitHub URL"
                value={githubURL}
                onChange={(ev) => setGithubURL(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input
                placeholder="Enter your Instagram URL"
                value={instagramURL}
                onChange={(ev) => setInstagramURL(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Facebook URL</Label>
              <Input
                placeholder="Enter your Facebook URL"
                value={facebookURL}
                onChange={(ev) => setFacebookURL(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Twitter URL</Label>
              <Input
                placeholder="Enter your Twitter URL"
                value={twitterURL}
                onChange={(ev) => setTwitterURL(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn URL</Label>
              <Input
                placeholder="Enter your LinkedIn URL"
                value={linkedInURL}
                onChange={(ev) => setLinkedInURL(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
                {!loading ? <Button onClick={handleUpdateProfile} className="w-full">
                    Update Profile
                </Button> : <SpecialLoadingButton content={"Updating"}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
