const socket = io();

socket.on("connect", () => {
  console.log("Socket Client: ", socket.id);
});

socket.on("broadcastMessage", (msg) => {
  console.log(msg);
});

const btn = document.getElementById("btn");
const txtMessage = document.getElementById("txtMessage");

if (btn && txtMessage) {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const msg = txtMessage.value;
    if (msg.trim()) {
      socket.emit("sendMessage", msg, (notify) => {
        // send message to server
        console.log("Aknowledgement received from server : ", notify);
      });
      txtMessage.value = ""; // clear the input field
    } else {
      console.log("Cannot send an empty message");
    }
  });
} else {
  console.log("Cannot find button or text input in your HTML");
}
