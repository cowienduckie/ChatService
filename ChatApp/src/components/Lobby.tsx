import { useState } from "react";
import { Button, Form } from "react-bootstrap";

type LobbyProps = {
  joinRoom: (user: string, room: string) => void;
};

const Lobby = (props: LobbyProps) => {
  const { joinRoom } = props;

  const [user, setUser] = useState<string>();
  const [room, setRoom] = useState<string>();

  return (
    <Form
      className="lobby"
      onSubmit={(e) => {
        e.preventDefault();
        if (user && room) {
          joinRoom(user, room);
        }
      }}
    >
      <Form.Group>
        <Form.Control placeholder="name" onChange={(e) => setUser(e.target.value)}></Form.Control>
        <Form.Control placeholder="room" onChange={(e) => setRoom(e.target.value)}></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!user || !room}>
        Join
      </Button>
    </Form>
  );
};

export default Lobby;
