import { Button } from "react-bootstrap";
import { ServerMessage } from "../interface";
import ConnectedUsers from "./ConnectedUsers";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

type ChatProps = {
  messages: ServerMessage[];
  users: string[];
  sendMessage: (message: string) => void;
  closeConnection: () => void;
};

const Chat = (props: ChatProps) => {
  return (
    <div>
      <div className="leave-room">
        <Button variant="danger" onClick={props.closeConnection}>
          Leave Room
        </Button>
      </div>
      <ConnectedUsers users={props.users} />
      <div className="chat">
        <MessageContainer messages={props.messages} />
        <SendMessageForm sendMessage={props.sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
