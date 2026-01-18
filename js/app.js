document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // ESTADO INICIAL
  // ===============================
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // ===============================
  // REFERENCIAS AL DOM
  // ===============================
  const botonesAgregar = document.querySelectorAll(".btn-agregar");
  const contadorCarrito = document.getElementById("contadorCarrito");
  const iconoCarrito = document.getElementById("iconoCarrito");

  // Elementos del dropdown
  const dropdown = document.getElementById("carritoDropdown");
  const dropdownItems = document.getElementById("dropdownItems");
  const dropdownTotal = document.getElementById("dropdownTotal");
  const btnVaciar = document.getElementById("dropdownVaciar");
  const btnCheckout = document.getElementById("dropdownCheckout");

  // ===============================
  // AGREGAR PRODUCTOS
  // ===============================
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
      const producto = {
        id: Date.now(),
        nombre: boton.dataset.nombre,
        precio: Number(boton.dataset.precio)
      };

      carrito.push(producto);
      guardarCarrito();
      actualizarContador();
      renderDropdown();
    });
  });

  // ===============================
  // ABRIR / CERRAR DROPDOWN
  // ===============================
  iconoCarrito.addEventListener("click", () => {
    dropdown.classList.toggle("activo");
    renderDropdown();
  });

  // ===============================
  // FUNCIONES
  // ===============================
  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function actualizarContador() {
    if (contadorCarrito) {
      contadorCarrito.textContent = carrito.length;
    }
  }

  function renderDropdown() {
    dropdownItems.innerHTML = "";

    if (carrito.length === 0) {
      dropdownItems.innerHTML = "<li>Carrito vacío</li>";
      dropdownTotal.textContent = "$0";
      return;
    }

    let total = 0;

    carrito.forEach(prod => {
      total += prod.precio;

      const li = document.createElement("li");
      li.innerHTML = `
        ${prod.nombre} - $${prod.precio}
        <button data-id="${prod.id}" class="btn-eliminar">X</button>
      `;
      dropdownItems.appendChild(li);
    });

    dropdownTotal.textContent = `$${total}`;
  }

  // ===============================
  // ELIMINAR PRODUCTO
  // ===============================
  dropdownItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const id = Number(e.target.dataset.id);
      carrito = carrito.filter(p => p.id !== id);
      guardarCarrito();
      actualizarContador();
      renderDropdown();
    }
  });

  // ===============================
  // VACIAR CARRITO
  // ===============================
  btnVaciar.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    actualizarContador();
    renderDropdown();
  });

  // ===============================
  // IR AL CHECKOUT
  // ===============================
  btnCheckout.addEventListener("click", () => {
    window.location.href = "./pages/checkout.html";
  });

  // ===============================
  // CARGA INICIAL
  // ===============================
  actualizarContador();
  renderDropdown();
});

