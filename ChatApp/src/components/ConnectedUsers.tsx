type ConnectedUsersProps = {
  users: string[];
};

const ConnectedUsers = (props: ConnectedUsersProps) => {
  return (
    <div className="user-list">
      <h4>Connected Users</h4>
      {props.users.map((u, index) => (
        <h6 key={index}>{u}</h6>
      ))}
    </div>
  );
};

export default ConnectedUsers;
