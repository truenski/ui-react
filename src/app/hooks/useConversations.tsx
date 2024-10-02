import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  fetchConversationsStart,
  fetchConversationsSuccess,
  fetchConversationsFailure,
} from "../store/conversation.slice";

const useConversations = () => {
  const dispatch = useDispatch();
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  const loading = useSelector((state: RootState) => state.conversation.loading);
  const error = useSelector((state: RootState) => state.conversation.error);

  const fetchConversations = async (filters: any) => {
    dispatch(fetchConversationsStart());
    try {
      // Simulate API call
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: 1,
                meta: { sender: { name: "John Doe" }, channel: "email" },
                messages: [],
                agent_last_seen_at: 0,
                timestamp: Date.now(),
              },
            ]),
          1000
        )
      );
      dispatch(fetchConversationsSuccess(response as any));
    } catch (err) {
      dispatch(fetchConversationsFailure("Failed to fetch conversations"));
    }
  };

  return { conversations, loading, error, fetchConversations };
};

export default useConversations;
