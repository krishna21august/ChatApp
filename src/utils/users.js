const users = [];

//addUser,removeUser,getUser,getUsersInRoom

const addUser = ({ id, username, room }) => {
  //clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validate the data
  if (!username || !room) {
    return {
      error: "username and room is required"
    };
  }

  //check for existing user
  const existingUser = users.find(user => {
    return user.username === username && user.room === room;
  });

  //validate username
  if (existingUser) {
    return {
      error: "username is in use!"
    };
  }

  //store user
  const user = { id, username, room };
  users.push(user);
  return user;
};

addUser({
  id: 11,
  username: "krishna",
  room: "South Philly"
});

const removeUser = id => {
  //finde index in an array
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
