document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // ESTADO INICIAL
  // ===============================
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // ===============================
  // REFERENCIAS AL DOM
  // ===============================
  const botonesAgregar = document.querySelectorAll(".btn-agregar");
  const listaCarrito = document.getElementById("carritoItems");
  const totalCarrito = document.getElementById("carritoTotal");
  const mensajeCarrito = document.getElementById("mensajeCarrito");

  const btnFinalizar = document.getElementById("btnFinalizar");
  const btnVaciar = document.getElementById("btnVaciar");

  const contadorCarrito = document.getElementById("contadorCarrito");
  const iconoCarrito = document.getElementById("iconoCarrito");
  const carritoAside = document.getElementById("carrito");
  const overlay = document.getElementById("overlay");


  // ===============================
  // EVENTOS
  // ===============================

  // Agregar productos al carrito
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
      const producto = {
        id: Date.now(),
        nombre: boton.dataset.nombre,
        precio: Number(boton.dataset.precio)
      };

      carrito.push(producto);
      guardarCarrito();
      renderCarrito();
      mostrarMensaje("Producto agregado al carrito 🛒");
    });
  });

  // Abrir / cerrar carrito
  if (iconoCarrito && carritoAside && overlay) {
    iconoCarrito.addEventListener("click", () => {
      carritoAside.classList.toggle("activo");
      overlay.classList.toggle("activo");
    });

    overlay.addEventListener("click", () => {
      carritoAside.classList.remove("activo");
      overlay.classList.remove("activo");
    });
  }

  // Finalizar compra
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", finalizarCompra);
  }

  // Vaciar carrito
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      carrito = [];
      guardarCarrito();
      renderCarrito();
      mostrarMensaje("Carrito vaciado");
    });
  }

  // ===============================
  // FUNCIONES
  // ===============================

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

 function renderCarrito() {
  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<li>El carrito está vacío</li>";
    totalCarrito.textContent = "$0";
    actualizarEstado();
    return;
  }

  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);

  carrito.forEach(prod => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${prod.nombre} - $${prod.precio}
      <button class="btn-eliminar" data-id="${prod.id}">X</button>
    `;
    listaCarrito.appendChild(li);
  });

  totalCarrito.textContent = `$${total}`;
  actualizarEstado();
}


  function finalizarCompra() {
    if (carrito.length === 0) {
      mostrarMensaje("El carrito está vacío.");
      return;
    }

    carrito = [];
    guardarCarrito();
    renderCarrito();
    mostrarMensaje("Compra realizada con éxito 🎉");

    if (carritoAside) {
      carritoAside.classList.remove("activo");
    }
  }

  function mostrarMensaje(texto) {
    mensajeCarrito.textContent = texto;
    setTimeout(() => {
      mensajeCarrito.textContent = "";
    }, 3000);
  }

  function actualizarEstado() {
    if (contadorCarrito) {
      contadorCarrito.textContent = carrito.length;
    }

    if (btnFinalizar) {
      btnFinalizar.disabled = carrito.length === 0;
    }
  }

  // ===============================
  // DELEGACIÓN DE EVENTOS (ELIMINAR)
  // ===============================
  listaCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const id = Number(e.target.dataset.id);
      eliminarProducto(id);
    }
  });

  function eliminarProducto(id) {
    carrito = carrito.filter(prod => prod.id !== id);
    guardarCarrito();
    renderCarrito();
    mostrarMensaje("Producto eliminado");
  }

  // ===============================
  // CARGA INICIAL
  // ===============================
  renderCarrito();
});
