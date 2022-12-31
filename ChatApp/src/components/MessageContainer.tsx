import { useEffect, useRef } from "react";
import { ServerMessage } from "../interface";

type MessageContainerProps = {
  messages: ServerMessage[];
};

const MessageContainer = (props: MessageContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef && messagesEndRef.current) {
      const { scrollHeight, clientHeight } = messagesEndRef.current;

      messagesEndRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [props.messages]);

  return (
    <div ref={messagesEndRef} className="message-container">
      {props.messages.map((m, index) => (
        <div key={index} className="user-message">
          <div className="message bg-primary">{m.message}</div>
          <div className="from-user">{m.user}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
