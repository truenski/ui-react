import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getConversation,
  fetchAllConversations,
  fetchPreviousMessages,
  sendMessage,
  emptyAllConversations,
  setChatFilter,
  resetConversationPage,
} from "./conversationActions";
import {
  Conversation,
  ConversationState,
} from "../containers/ConversationCard/ConversationCard.types";

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchConversationsStart(state) {
      state.loading = true;
    },
    fetchConversationsSuccess(state, action: PayloadAction<Conversation[]>) {
      state.loading = false;
      state.conversations = action.payload;
    },
    fetchConversationsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversation.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.loading = false;
        // Update state as needed
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload.chatList;
        // Update state as needed
      })
      .addCase(fetchAllConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPreviousMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPreviousMessages.fulfilled, (state, action) => {
        state.loading = false;
        // Update state as needed
      })
      .addCase(fetchPreviousMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        // Update state as needed
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(emptyAllConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(emptyAllConversations.fulfilled, (state) => {
        state.loading = false;
        state.conversations = [];
      })
      .addCase(emptyAllConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(setChatFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(setChatFilter.fulfilled, (state, action) => {
        state.loading = false;
        // Update state as needed
      })
      .addCase(setChatFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetConversationPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetConversationPage.fulfilled, (state) => {
        state.loading = false;
        // Update state as needed
      })
      .addCase(resetConversationPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  fetchConversationsStart,
  fetchConversationsSuccess,
  fetchConversationsFailure,
} = conversationSlice.actions;

export default conversationSlice.reducer;
