import { Button } from "@/components/ui/button";
import { clearAllUserErrors, logout } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {
  const [active, setActive] = useState("");
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:">

        </aside>
      </div>
    </>
  );
};

export default HomePage;
