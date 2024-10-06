export const calculateScrollTop = (scrollHeight, clientHeight, relevantMessages) => {
    if (relevantMessages.length > 0) {
      const lastMessage = relevantMessages[relevantMessages.length - 1];
      return lastMessage.offsetTop - clientHeight + lastMessage.clientHeight;
    }
    return scrollHeight - clientHeight;
  };