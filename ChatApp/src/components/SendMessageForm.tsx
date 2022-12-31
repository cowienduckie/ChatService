import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";
import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

type SendMessageFormProps = {
  sendMessage: (message: string) => void;
};

const SendMessageForm = (props: SendMessageFormProps) => {
  const { sendMessage } = props;
  const [message, setMessage] = useState<string>("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
    >
      <InputGroup>
        <FormControl
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="primary" type="submit" disabled={!message}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
