document.addEventListener("DOMContentLoaded", () => {

  const lista = document.getElementById("checkoutLista");
  const total = document.getElementById("checkoutTotal");
  const btnPagar = document.getElementById("btnPagar");
  const mensaje = document.getElementById("mensajePago");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    mensaje.textContent = "No hay productos en el carrito.";
    btnPagar.disabled = true;
    return;
  }

  // Render resumen
  const totalCompra = carrito.reduce((acc, prod) => acc + prod.precio, 0);

  carrito.forEach(prod => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${prod.nombre}</span>
      <span>$${prod.precio}</span>
    `;
    lista.appendChild(li);
  });

  total.textContent = `$${totalCompra}`;

  // Simulación de pago
  btnPagar.addEventListener("click", () => {
    const metodo = document.querySelector("input[name='pago']:checked");

    if (!metodo) {
      mensaje.textContent = "Seleccioná un medio de pago.";
      return;
    }

    const pagoAceptado = Math.random() > 0.3; // 70% éxito

    if (pagoAceptado) {
      mensaje.textContent = "Pago aprobado ✅ Gracias por tu compra";
      localStorage.removeItem("carrito");
      btnPagar.disabled = true;
    } else {
      mensaje.textContent = "Pago rechazado ❌ Intentá nuevamente";
    }
  });

});
