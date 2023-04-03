if (document.getElementById("prodCont")) {
  //verificar sesion activa en /products
  fetch("/api/session/", {
    method: "GET",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.url !== "http://localhost:8080/products") {
      return (window.location.href = response.url);
    }
  });

  renderProducts();
  //tomar datos del usuario atravez de la cookie que se genero con cookie-parse en el endpoint
  function getUserCookie() {
    const cookies = document.cookie.split(";");
    let userData;
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith("userData=")) {
        const valor = cookie.substring("userData=".length, cookie.length);
        userData = JSON.parse(decodeURIComponent(valor));
        break;
      }
    }
    return userData;
  }

  function renderProducts() {
    let logout = document.getElementById("logout");
    logout.addEventListener("click", () => {
      fetch("/api/session/logout", {
        method: "GET",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        window.location.href = response.url;
      });
    });

    const user = getUserCookie();
    let userBar = document.getElementById("userBar");
    let prodCont = document.getElementById("prodCont");
    let attribute = prodCont.getAttribute("class");
    socket.on("products", (data) => {
      if (user) {
        userBar.innerHTML = `
    <h3 class="userName" >Hola ${user.first_name} ${user.last_name}</h3>
    <h4>email:${user.email}</h4>
    <h4>edad:${user.age}</h4>
    <h3 class="userRol"> Rol: ${user.rol}</h3>
        `;
      }
      let prodCont = document.getElementById("prodCont");
      let attribute = prodCont.getAttribute("class");
      prodCont.innerHTML = "";

      data.forEach((element) => {
        const allProducts = document.createElement("ul");
        allProducts.className = "list-group";
        allProducts.id = `producto-${element._id}`;

        allProducts.innerHTML = `
          <li class="list-group-item">Title: ${element.title}</li>
          <li class="list-group-item">Description: ${element.description}</li>
          <li class="list-group-item">Code: ${element.code}</li>
          <li class="list-group-item">Price: ${element.price}</li>
          <li class="list-group-item">Status: ${element.status}</li>
          <li class="list-group-item">Stock: ${element.stock}</li>
          <li class="list-group-item">Thumbnails: ${element.thumbnails}</li>
        `;
        if (attribute === "prodCont") {
          const deleteButton = document.createElement("button");
          deleteButton.className = "btn btn-primary mb-2";
          deleteButton.textContent = "Delete";

          deleteButton.addEventListener("click", () => {
            socket.emit("deleteProduct", element._id);
          });
          allProducts.appendChild(deleteButton);
        } else {
          const addToCartButton = document.createElement("button");
          addToCartButton.className = "btn btn-primary mb-2";
          addToCartButton.textContent = "Add to cart";
          addToCartButton.addEventListener("click", () => {
            socket.emit("addProductToCar", element._id);
          });
          allProducts.appendChild(addToCartButton);
          const hr = document.createElement("HR");
          allProducts.appendChild(hr);
        }

        document.getElementById("prodCont").appendChild(allProducts);
      });
    });
    if (attribute !== "homeProdCont") {
      const form = document.getElementById("addProduct");
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("titulo").value;
        const description = document.getElementById("description").value;
        const code = document.getElementById("code").value;
        const price = document.getElementById("price").value;
        const status = document.getElementById("status").value;
        const stock = document.getElementById("stock").value;
        const category = document.getElementById("category").value;
        const thumbnails = document.getElementById("thumbnails").value;
        const newProduct = {
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnails,
        };

        socket.emit("addProducts", newProduct);
      });
    }
  }
}
