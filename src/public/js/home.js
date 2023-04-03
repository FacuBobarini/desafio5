if (document.getElementById("homeCont")) {
  fetch("/api/session/", {
    method: "GET",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.url === "http://localhost:8080/products") {
      window.location.href = response.url;
    }
  });

  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");
  registerBtn.addEventListener("click", () => {
    socket.emit("homeSelect", "register");
  });
  loginBtn.addEventListener("click", () => {
    socket.emit("homeSelect", "login");
  });

  socket.on("home", (option) => {
    let formCont = document.getElementById("formCont");
    formCont.innerHTML = "";
    const form = document.createElement("div");
    if (option === "login") {
      form.innerHTML = `<form id="loginForm">
      <div class="form-group">
        <label >Email address</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label >Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <button type="submit" style="margin-top:20px" class="btn btn-primary" id="loginSubmit">Login</button>
    </form>`;
      document.getElementById("formCont").appendChild(form);
      const submit = document.getElementById("loginForm");
      submit.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        fetch("/api/session/testlogin", {
          method: "POST",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }).then((response) => {
          window.location.href = response.url;
        });
      });
    }

    if (option === "register") {
      form.innerHTML = `<form id="loginForm">
      <div class="form-group">
        <label >First Name</label>
        <input  class="form-control" id="first_name"  placeholder="Enter First Name">
      </div>
      <div class="form-group">
        <label >Last Name</label>
        <input  class="form-control" id="last_name"  placeholder="Enter Last Name">
      </div>
      <div class="form-group">
        <label >Email address</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label >Age</label>
        <input  class="form-control" id="age"  placeholder="Enter Age">
      </div>
      <div class="form-group">
        <label >Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <button type="submit" style="margin-top:20px" class="btn btn-primary" id="loginSubmit">Sign up</button>
    </form>`;
      document.getElementById("formCont").appendChild(form);
      const submit = document.getElementById("loginForm");
      submit.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const first_name = document.getElementById("first_name").value;
        const last_name = document.getElementById("last_name").value;
        const age = document.getElementById("age").value;
        fetch("/api/users/", {
          method: "POST",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            first_name,
            last_name,
            age,
          }),
        }).then((response) => {
          window.location.href = response.url;
        });
      });
    }
  });
}
