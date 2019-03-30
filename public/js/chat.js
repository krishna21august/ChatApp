const socket = io();

socket.on("message", message => {
  console.log(message);
});
document.querySelector("#message-form").addEventListener("submit", e => {
  e.preventDefault();
  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, error => {
    if (error) {
      console.log(error);
    }
  });
});

document.querySelector("#send-location").addEventListener("click", () => {
  //if geolocation api not supported by Browser
  if (!navigator.geolocation) {
    return alert("geolocation api is not supported by your Browser");
  }
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      () => {
        console.log("location shared");
      }
    );
  });
});
