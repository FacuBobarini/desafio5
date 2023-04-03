const socket = io();
if (document.getElementById("chatBox")) {
  const chatBox = document.getElementById("chatBox");
  const messageLogs = document.getElementById("messageLogs");
  let newUser;

  Swal.fire({
    title: "Inicia sesion",
    input: "text",
    text: "Indique su correo",
    inputValidator: (valor) => {
      return !valor && "Ingrese un valor valido";
    },
    allowOutsideClick: false,
  }).then((result) => {
    newUser = result.value;
  });

  chatBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      socket.emit("message", { user: newUser, message: chatBox.value });
      chatBox.value = null;
    }
  });

  socket.on("messages", (info) => {
    messageLogs.innerHTML = "";
    info.forEach((element) => {
      messageLogs.appendChild(document.createElement("HR"));
      messageLogs.innerHTML += `<li class="input-group mb-3"><span class="input-group-text">${element.user}</span><span class="form-control">${element.message}</span></li>`;
    });
  });
}
