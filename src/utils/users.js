const users = [];

const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data
  if (!username || !room) {
    return {
      error: "Username and room are required!"
    };
  }

  // Check for existing user
  const existingUser = users.find(user => {
    return user.room === room && user.username === username;
  });

  // Validate username
  if (existingUser) {
    return {
      error: "Username is in use!"
    };
  }

  // Store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = id => {
  //GET INDEX OF STORED USER
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    //REMOVE INDEX FROM ARRAY
    return users.splice(index, 1)[0];
  }
};

//GET DETAILS OF A PARTICULAR USER
const getUser = id => {
  return users.find(user => user.id === id);
};

//GET ALL USERS IN A CHATROOM
const getUsersInRoom = room => {
  room = room.trim().toLowerCase();
  return users.filter(user => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
};
