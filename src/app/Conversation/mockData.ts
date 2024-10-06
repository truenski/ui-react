// Mock data and helper functions
export const mockTranslations = {
  "CHAT_LIST.CHAT_STATUS_ITEMS": [
    { VALUE: "open", TEXT: "Aberto" },
    { VALUE: "resolved", TEXT: "Resolvido" },
    { VALUE: "pending", TEXT: "Pendente" },
  ],
  "CHAT_LIST.LIST.404": "Nenhuma conversa encontrada",
  "CHAT_LIST.LOAD_MORE_CONVERSATIONS": "Carregar mais conversas",
  "CHAT_LIST.EOF": "Fim da lista",
  "CHAT_LIST.NO_CONTENT": "Sem mensagens",
  "CHAT_LIST.ATTACHMENTS.image.ICON": "ícone-imagem",
  "CHAT_LIST.ATTACHMENTS.image.CONTENT": "Imagem",
};

export const mockConstants = {
  STATUS_TYPE: {
    OPEN: "open",
  },
  ASSIGNEE_TYPE: {
    ME: "me",
  },
};

export const thumbnailImage =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

export interface Conversation {
  id: number;
  meta: {
    sender: { id: number };
    channel: string;
  };
  inbox_id: number;
  timestamp: string;
  unread_count: number;
}

export const mockConversations: Conversation[] = [
  {
    id: 1,
    meta: {
      sender: { id: 101 },
      channel: "web",
    },
    inbox_id: 1,
    timestamp: new Date().toISOString(),
    unread_count: 3,
  },
  {
    id: 2,
    meta: {
      sender: { id: 102 },
      channel: "web",
    },
    inbox_id: 1,
    timestamp: new Date().toISOString(),
    unread_count: 0,
  },
  {
    id: 3,
    meta: {
      sender: { id: 103 },
      channel: "web",
    },
    inbox_id: 1,
    timestamp: new Date().toISOString(),
    unread_count: 1,
  },
  {
    id: 4,
    meta: {
      sender: { id: 104 },
      channel: "web",
    },
    inbox_id: 1,
    timestamp: new Date().toISOString(),
    unread_count: 0,
  },
  {
    id: 5,
    meta: {
      sender: { id: 105 },
      channel: "web",
    },
    inbox_id: 1,
    timestamp: new Date().toISOString(),
    unread_count: 0,
  },
  {
    id: 6,
    meta: {
      sender: { id: 106 },
      channel: "web",
    },
    inbox_id: 1,
    timestamp: new Date().toISOString(),
    unread_count: 1,
  },
  {
    id: 7,
    meta: {
      sender: { id: 107 },
      channel: "web",
    },
    inbox_id: 1,
    timestamp: new Date().toISOString(),
    unread_count: 0,
  },
  {
    id: 8,
    meta: {
      sender: { id: 108 },
      channel: "web",
    },
    inbox_id: 1,
    timestamp: new Date().toISOString(),
    unread_count: 0,
  },
  {
    id: 9,
    meta: {
      sender: { id: 109 },
      channel: "web",
    },
    inbox_id: 1,
    timestamp: new Date().toISOString(),
    unread_count: 0,
  },
];

export const mockContacts = {
  101: {
    id: 101,
    name: "Paulo Gustavo",
    thumbnail: thumbnailImage,
    availability_status: "online",
    lastMessage: {
      content: "Posso ajudar em mais alguma coisa",
      message_type: "incoming",
      attachments: [
        { file_type: "image", url: "https://example.com/image.jpg" },
      ],
    },
    lastMessageTime: "2m ago",
    unreadMessages: 2,
    additional_attributes: {
      browser: {
        browser_name: "Chrome",
        browser_version: "89.0",
        platform_name: "Windows",
        platform_version: "10",
      },
      referer: "https://example.com",
      initiated_at: {
        timestamp: "2023-10-01T12:34:56Z",
      },
    },
  },
  102: {
    id: 102,
    name: "Mariana de Azevedo",
    thumbnail: thumbnailImage,
    lastMessage: {
      content: "Ótimo! Você poderia me contar um pouco mais sobre...",
      message_type: "outgoing",
      attachments: [],
    },
    lastMessageTime: "1m ago",
    unreadMessages: 0,
  },
  103: {
    id: 103,
    name: "Paula da Silva",
    thumbnail: thumbnailImage,
    lastMessage: {
      content: "Se preferir, posso transferir você diretamente para...",
      message_type: "incoming",
      attachments: [
        { file_type: "document", url: "https://example.com/document.pdf" },
      ],
    },
    lastMessageTime: "3m ago",
    unreadMessages: 1,
  },
  104: {
    id: 104,
    name: "João Guilherme",
    thumbnail: thumbnailImage,
    lastMessage: {
      content: "Caso deseje prosseguir com a confirmação...",
      message_type: "outgoing",
      attachments: [],
    },
    lastMessageTime: "2m ago",
    unreadMessages: 0,
  },
  105: {
    id: 105,
    name: "Ana Vitória",
    thumbnail: thumbnailImage,
    lastMessage: {
      content: "",
      message_type: "incoming",
      attachments: [],
    },
    lastMessageTime: null,
    unreadMessages: 0,
  },
  106: {
    id: 106,
    name: "Alinne da Silva",
    thumbnail: thumbnailImage,
    lastMessage: {
      content: "Oi! Como posso ajudar você hoje?",
      message_type: "outgoing",
      attachments: [
        { file_type: "image", url: "https://example.com/image2.jpg" },
      ],
    },
    lastMessageTime: "3m ago",
    unreadMessages: 1,
  },
  107: {
    id: 107,
    name: "João da Silva",
    thumbnail: thumbnailImage,
    lastMessage: {
      content: "Tudo ótimo, obrigada por perguntar!",
      message_type: "incoming",
      attachments: [],
    },
    lastMessageTime: "3m ago",
    unreadMessages: 0,
  },
  108: {
    id: 108,
    name: "Luiz da Silva",
    thumbnail: thumbnailImage,
    lastMessage: {
      content: "Eu sou apenas uma especialista virtual...",
      message_type: "outgoing",
      attachments: [],
    },
    lastMessageTime: "3m ago",
    unreadMessages: 0,
  },
  109: {
    id: 109,
    name: "Carlos da Silva",
    thumbnail: thumbnailImage,
    lastMessage: {
      content: "Vamos manter o foco em como podemos...",
      message_type: "incoming",
      attachments: [
        { file_type: "document", url: "https://example.com/document2.pdf" },
      ],
    },
    lastMessageTime: "3m ago",
    unreadMessages: 0,
  },
};

export const mockInboxes = {
  1: { name: "chatwoot.app.br", channel_type: "web" },
};

export type TChat = {
  id: number;
  unread_count: number;
  meta: {
    sender: {
      name: string;
      thumbnail: string;
      availability_status: string;
    };
    channel: string;
  };
  messages: {
    id: number;
    content: string;
    created_at: number;
    message_type: number;
    private: boolean;
    attachments?: { file_type: string }[];
  }[];
  agent_last_seen_at: number;
  timestamp: number;
};

export type TCurrentChat = {
  id: number;
  can_reply: boolean;
  isATweet: boolean;
  isATwilioWhatsappChannel: boolean;
  muted?: boolean;
  meta: {
    sender: {
      id: number;
      email: string;
    };
    assignee: {
      id: number;
      email: string;
    };
    channel: string;
  };
  status: string;
};

export const mockCurrentChat = {
  id: 1,
  can_reply: true,
  isATweet: false,
  isATwilioWhatsappChannel: false,
  meta: {
    sender: {
      id: 1,
      email: "sender@example.com",
    },
    assignee: {
      id: 2,
      email: "assignee@example.com",
    },
    channel: "web",
  },
  status: "open",
  additional_attributes: {
    browser: {
      browser_name: "Chrome",
      browser_version: "89.0",
      platform_name: "Windows",
      platform_version: "10",
    },
    referer: "https://example.com",
    initiated_at: {
      timestamp: "2023-10-01T12:34:56Z",
    },
  },
};

export const mockAgentsList = [
  { id: 1, name: "Agent A", availability_status: "available" },
  { id: 2, name: "Agent B", availability_status: "busy" },
  { id: 3, name: "Agent C", availability_status: "offline" },
];

export const mockTeamsList = [
  { id: 1, name: "Team A" },
  { id: 2, name: "Team B" },
  { id: 3, name: "Team C" },
];

export const mockUIFlags = {
  isFetching: false,
};

export const mockMessages = [
  {
    id: 1,
    content: "Hello, how can I help you?",
    read: true,
    status: "sent",
    message_type: "incoming",
    alignBubble: "left",
    wrapClass: "wrap",
    bubbleClass: "bubble",
    sender: {
      name: "Agent",
      thumbnail: "https://via.placeholder.com/150",
      screen_name: "agent",
    },
    attachments: [],
  },
  {
    id: 2,
    content: "I need help with my order.",
    read: false,
    status: "sent",
    message_type: "outgoing",
    alignBubble: "right",
    wrapClass: "wrap",
    bubbleClass: "bubble",
    sender: {
      name: "Customer",
      thumbnail: "https://via.placeholder.com/150",
      screen_name: "customer",
    },
    attachments: [],
  },
];

export const mockTypingUsers = [
  {
    id: 1,
    name: "Agent",
  },
];

export const mockSender = {
  name: "Agent",
  thumbnail: "https://via.placeholder.com/150",
  screen_name: "agent",
};

export const mockInboxesList = [
  {
    id: 1,
    name: "Inbox 1",
    channel_type: "email",
    phone_number: "11 99430-8687",
  },
];
export const mockActiveInbox = null;
export const mockCurrentUser = { id: 1, name: "User" };
export const mockAccountId = 1;

export const mockFetchConversations = async ({ q }: { q: string }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!q) {
        resolve(mockConversations);
      } else {
        const filteredConversations = mockConversations.filter(
          (conversation) => {
            const contact = mockContacts[conversation.meta.sender.id];
            return contact.name.toLowerCase().includes(q.toLowerCase());
          }
        );
        resolve(filteredConversations);
      }
    }, 1000); // Simulate network delay
  });
};
