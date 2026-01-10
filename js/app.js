document.addEventListener("DOMContentLoaded", () => {

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const btnFinalizar = document.getElementById("btnFinalizar");
  const mensajeCarrito = document.getElementById("mensajeCarrito");
  const botonesAgregar = document.querySelectorAll(".btn-agregar");
  const listaCarrito = document.getElementById("carritoItems");
  const totalCarrito = document.getElementById("carritoTotal");

  // Agregar productos
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
    });
  });

  // ✅ EVENTO FINALIZAR COMPRA (ESTO FALTABA)
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", finalizarCompra);
  }

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function renderCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(prod => {
      total += prod.precio;

      const li = document.createElement("li");
      li.innerHTML = `
        ${prod.nombre} - $${prod.precio}
        <button onclick="eliminarProducto(${prod.id})">X</button>
      `;
      listaCarrito.appendChild(li);
    });

    totalCarrito.textContent = `$${total}`;
  }

  function finalizarCompra() {
    if (carrito.length === 0) {
      mostrarMensaje("El carrito está vacío.");
      return;
    }

    carrito = [];
    localStorage.removeItem("carrito");
    renderCarrito();
    mostrarMensaje("Compra realizada con éxito 🎉");
  }

  function mostrarMensaje(texto) {
    mensajeCarrito.textContent = texto;
    setTimeout(() => mensajeCarrito.textContent = "", 3000);
  }

  window.eliminarProducto = function (id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    renderCarrito();
  };

  renderCarrito();
});
