import { createAsyncThunk } from "@reduxjs/toolkit";
// import ConversationApi from "@/api/inbox/conversation";
// import MessageApi from "@/api/inbox/message";
import { MESSAGE_STATUS } from "@/shared/constants/messages";
import { createPendingMessage } from "@/dashboard/helper/commons";

export const getConversation = createAsyncThunk(
  "conversation/getConversation",
  async (conversationId: number, { rejectWithValue }) => {
    try {
      //   const response = await ConversationApi.show(conversationId);
      const response = {
        id: 1,
        message: "Test conversation",
      };

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllConversations = createAsyncThunk(
  "conversation/fetchAllConversations",
  async (params: any, { rejectWithValue }) => {
    try {
      //   const response = await ConversationApi.get(params);
      const response = [{ id: 1, message: "Search result" }];
      const { payload: chatList, meta: metaData } = response;
      return { chatList, metaData };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const emptyAllConversations = createAsyncThunk(
  "conversation/emptyAllConversations",
  async (_, { rejectWithValue }) => {
    try {
      // Assuming there's an API call to empty conversations
      //   await ConversationApi.emptyAll();
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const setChatFilter = createAsyncThunk(
  "conversation/setChatFilter",
  async (filter: string, { rejectWithValue }) => {
    try {
      // Assuming there's an API call to set chat filter
      //   await ConversationApi.setFilter(filter);
      return filter;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetConversationPage = createAsyncThunk(
  "conversation/resetConversationPage",
  async (_, { rejectWithValue }) => {
    try {
      // Assuming there's an API call to reset conversation page
      //   await ConversationApi.resetPage();
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPreviousMessages = createAsyncThunk(
  "conversation/fetchPreviousMessages",
  async (data: any, { rejectWithValue }) => {
    try {
      //   const response = await MessageApi.getPreviousMessages(data);
      //   return response.data;
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "conversation/sendMessage",
  async (data: any, { rejectWithValue }) => {
    try {
      //   const pendingMessage = createPendingMessage(data);
      //   const response = await MessageApi.create(pendingMessage);
      //   return { ...response.data, status: MESSAGE_STATUS.SENT };
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
