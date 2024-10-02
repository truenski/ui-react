import { z } from "zod";

export const ConversationSchema = z.object({
  id: z.number(),
  meta: z.object({
    sender: z.object({
      name: z.string(),
      thumbnail: z.string().optional(),
      availability_status: z.string().optional(),
    }),
    channel: z.string(),
  }),
  messages: z.array(
    z.object({
      created_at: z.number(),
      message_type: z.number(),
      private: z.boolean(),
      content: z.string().optional(),
    })
  ),
  agent_last_seen_at: z.number(),
  timestamp: z.number(),
});

export type Conversation = z.infer<typeof ConversationSchema>;

export interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
}

export interface ConversationCardProps {
  chat: Conversation;
  activeLabel?: string;
  hideInboxName?: boolean;
  hideThumbnail?: boolean;
  teamId?: string | number;
  onCardClick: (chat: Conversation) => void;
}
