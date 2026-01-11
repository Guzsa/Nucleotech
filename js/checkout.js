document.addEventListener("DOMContentLoaded", () => {

  const lista = document.getElementById("checkoutItems");
  const totalSpan = document.getElementById("checkoutTotal");
  const metodoPago = document.getElementById("metodoPago");
  const mensaje = document.getElementById("mensajeCheckout");

  const btnPagar = document.getElementById("btnPagar");
  const btnCancelar = document.getElementById("btnCancelar");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function renderCheckout() {
    lista.innerHTML = "";

    if (carrito.length === 0) {
      mensaje.textContent = "No hay productos en el carrito";
      btnPagar.disabled = true;
      return;
    }

    let total = 0;

    carrito.forEach(prod => {
      total += prod.precio;
      const li = document.createElement("li");
      li.textContent = `${prod.nombre} - $${prod.precio}`;
      lista.appendChild(li);
    });

    totalSpan.textContent = `$${total}`;
  }

  btnPagar.addEventListener("click", () => {
    if (!metodoPago.value) {
      mensaje.textContent = "Seleccioná un método de pago";
      return;
    }

    mensaje.textContent = "Pago aprobado ✅ ¡Gracias por tu compra!";
    localStorage.removeItem("carrito");

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 3000);
  });

  btnCancelar.addEventListener("click", () => {
    mensaje.textContent = "Pago cancelado ❌";
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 2000);
  });

  renderCheckout();
});
