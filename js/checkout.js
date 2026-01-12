document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ESTADO
  // =========================
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // =========================
  // DOM
  // =========================
  const lista = document.getElementById("checkoutLista");
  const total = document.getElementById("checkoutTotal");

  const btnContinuar = document.getElementById("btnFinalizarCheckout");
  const mensaje = document.getElementById("mensajeCheckout");

  const modal = document.getElementById("modalConfirmacion");
  const detallePago = document.getElementById("detallePago");
  const btnConfirmar = document.getElementById("confirmarPago");
  const btnCancelar = document.getElementById("cancelarPago");

  const loader = document.getElementById("loaderPago");

  // =========================
  // RENDER
  // =========================
  function renderResumen() {
    lista.innerHTML = "";

    let suma = 0;

    carrito.forEach(prod => {
      suma += prod.precio;

      const li = document.createElement("li");
      li.textContent = `${prod.nombre} - $${prod.precio}`;
      lista.appendChild(li);
    });

    total.textContent = `$${suma}`;
  }

  // =========================
  // CONTINUAR
  // =========================
  btnContinuar.addEventListener("click", () => {

     // Validación de carrito vacío
  if (carrito.length === 0) {
    mensaje.textContent = "No hay productos en el carrito.";
    return;
  }

    const metodo = document.querySelector('input[name="pago"]:checked');

    if (!metodo) {
      mensaje.textContent = "Seleccioná un método de pago";
      return;
    }

    mensaje.textContent = "";

    detallePago.textContent = `Vas a pagar con ${metodo.value}. ¿Confirmás la compra?`;
    modal.classList.add("activo");
  });

  // =========================
  // CONFIRMAR
  // =========================
  btnConfirmar.addEventListener("click", () => {
    modal.classList.remove("activo");
    loader.classList.add("activo");

    setTimeout(() => {
      loader.classList.remove("activo");
      localStorage.removeItem("carrito");
      window.location.href = "success.html";
    }, 2500);
  });

  // =========================
  // CANCELAR
  // =========================
  btnCancelar.addEventListener("click", () => {
    modal.classList.remove("activo");
  });

  // =========================
  // INIT
  // =========================
  renderResumen();
});
