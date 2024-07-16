import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import SpecialLoadingButton from './SpecialLoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from '@/store/slices/userSlice'
import { toast } from 'react-toastify'

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
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
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="mb-5">Update Your Dashboard password</p>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label>Current password</Label>
              <Input
                type="text"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(ev) => setCurrentPassword(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>New password</Label>
              <Input
                type="text"
                placeholder="Create a new password"
                value={newPassword}
                onChange={(ev) => setNewPassword(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm password</Label>
              <Input
                type="text"
                placeholder="Confirm your new password"
                value={confirmNewPassword}
                onChange={(ev) => setConfirmNewPassword(ev.target.value)}
              />
            </div>
            <div className="grid gap-2">
                {!loading ? <Button onClick={handleUpdatePassword} className="w-full">
                    Update Password
                </Button> : <SpecialLoadingButton content={"Updating"}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePassword