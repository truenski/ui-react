export const getTypingUsersText = (users) => {
    return users.map(user => user.name).join(', ');
  };