document.addEventListener("DOMContentLoaded", () => {

  // --- ESTADO ---
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // --- REFERENCIAS DOM ---
  const lista = document.getElementById("checkoutLista");
  const totalDisplay = document.getElementById("checkoutTotal");
  const btnContinuar = document.getElementById("btnFinalizarCheckout");
  const mensaje = document.getElementById("mensajeCheckout");
  const modal = document.getElementById("modalConfirmacion");
  const detallePago = document.getElementById("detallePago");
  const btnConfirmar = document.getElementById("confirmarPago");
  const btnCancelar = document.getElementById("cancelarPago");
  const loader = document.getElementById("loaderPago");

  // --- LÓGICA DE CÁLCULO (Separada del render) ---
  const calcularTotalFinal = () => {
    return carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
  };

  // --- RENDERIZADO ---
  function renderResumen() {
    lista.innerHTML = "";

    if (carrito.length === 0) {
      lista.innerHTML = "<li>Tu carrito está vacío</li>";
      totalDisplay.textContent = "$0";
      return;
    }

    carrito.forEach(prod => {
      const li = document.createElement("li");
      // Ahora mostramos la cantidad y el subtotal por producto
      li.innerHTML = `
        <div class="checkout-item">
          <span>${prod.nombre} <strong>(x${prod.cantidad})</strong></span>
          <span>$${prod.precio * prod.cantidad}</span>
        </div>
      `;
      lista.appendChild(li);
    });

    totalDisplay.textContent = `$${calcularTotalFinal()}`;
  }

  // --- GESTIÓN DE PAGO ---
  btnContinuar.addEventListener("click", () => {
    if (carrito.length === 0) {
      mensaje.textContent = "No hay productos en el carrito para procesar la compra.";
      return;
    }

    const metodo = document.querySelector('input[name="pago"]:checked');

    if (!metodo) {
      mensaje.textContent = "Por favor, seleccioná un método de pago";
      return;
    }

    mensaje.textContent = "";
    detallePago.innerHTML = `
      Vas a pagar <strong>$${calcularTotalFinal()}</strong> con <strong>${metodo.value}</strong>.<br>
      ¿Confirmás la operación?
    `;
    modal.classList.add("activo");
  });

  btnConfirmar.addEventListener("click", () => {
    modal.classList.remove("activo");
    loader.classList.add("activo");

    setTimeout(() => {
      loader.classList.remove("activo");
      localStorage.removeItem("carrito");
      window.location.href = "success.html";
    }, 2500);
  });

  btnCancelar.addEventListener("click", () => {
    modal.classList.remove("activo");
  });

  // --- INICIO ---
  renderResumen();
});