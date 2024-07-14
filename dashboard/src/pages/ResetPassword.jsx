import SpecialLoadingButton from "@/components/SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearAllForgotResetPasswordErrors, resetPassword } from "@/store/slices/forgotResetPasswordSlice";
import { getUser } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {

  const {token} = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {loading, error, message} = useSelector(state => state.forgotPassword);
  const {isAuthenticated} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotResetPasswordErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message !== null) {
      toast.success(message);
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset your Password</h1>
            <p className="text-balance text-muted-foreground">
              Set a new password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                required
              />
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Resetting Password"} />
            ) : (
              <Button
                type="submit"
                className="w-full"
                onClick={handleResetPassword}
              >
                Reset your password
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
