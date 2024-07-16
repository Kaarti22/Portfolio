import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice";
import messagesReducer from "./slices/messagesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    messages: messagesReducer,
  },
});
