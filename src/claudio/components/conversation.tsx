const ConversationList = ({ conversations }) => {
  return (
    <div className="conversation-list">
      <div className="search-bar">
        <input type="text" placeholder="Procurar por mensagens nas conversas" />
      </div>
      <div className="conversation-tabs">
        <button className="tab active">Minha</button>
        <button className="tab">Não atribuída</button>
        <button className="tab">Todos</button>
      </div>
      <ul className="conversations">
        {conversations.map((conversation) => (
          <li key={conversation.id} className="conversation-item">
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="avatar"
            />
            <div className="conversation-details">
              <h3>{conversation.name}</h3>
              <p>{conversation.lastMessage}</p>
            </div>
            <span className="time">{conversation.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
