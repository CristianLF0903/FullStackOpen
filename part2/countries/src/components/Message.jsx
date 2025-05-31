const Message = ({ message, type }) => {
  if (!message) return null;
  return <div className={`message message-${type}`}>{message}</div>;
};

export default Message;
