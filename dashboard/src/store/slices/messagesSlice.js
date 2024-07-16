import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state, action) {
      (state.messages = []), (state.error = null), (state.loading = true);
    },
    getAllMessagesSuccess(state, action) {
      (state.messages = action.payload),
        (state.error = null),
        (state.loading = false);
    },
    getAllMessagesFailed(state, action) {
      (state.messages = state.messages),
        (state.error = action.payload),
        (state.loading = false);
    },
    clearAllMessagesErrors(state, action) {
      (state.error = null), (state.messages = state.messages);
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messagesSlice.actions.getAllMessagesRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/message/getall",
      { withCredentials: true }
    );
    dispatch(messagesSlice.actions.getAllMessagesSuccess(data.messages));
    dispatch(messagesSlice.actions.clearAllMessagesErrors());
  } catch (error) {
    dispatch(messagesSlice.actions.getAllMessagesFailed(error.response.data.message));
  }
};

export default messagesSlice.reducer;