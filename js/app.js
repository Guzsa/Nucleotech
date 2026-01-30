document.addEventListener("DOMContentLoaded", () => {

  // --- ESTADO ---
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // --- REFERENCIAS AL DOM ---
  const botonesAgregar = document.querySelectorAll(".btn-agregar");
  const contadorCarrito = document.getElementById("contadorCarrito");
  const iconoCarrito = document.getElementById("iconoCarrito");
  const dropdown = document.getElementById("carritoDropdown");
  const dropdownItems = document.getElementById("dropdownItems");
  const dropdownTotal = document.getElementById("dropdownTotal");
  const btnVaciar = document.getElementById("dropdownVaciar");
  const btnCheckout = document.getElementById("dropdownCheckout");

  // --- LÓGICA DE CÁLCULO (Separada del renderizado) ---
  const calcularTotal = () => {
    return carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
  };

  const calcularUnidadesTotales = () => {
    return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  };

  // --- PERSISTENCIA ---
  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // --- FUNCIONES DE INTERFAZ (Renderizado) ---
  function actualizarContador() {
    if (contadorCarrito) {
      contadorCarrito.textContent = calcularUnidadesTotales();
    }
  }

  function renderDropdown() {
    dropdownItems.innerHTML = "";

    if (carrito.length === 0) {
      dropdownItems.innerHTML = "<li>Carrito vacío</li>";
      dropdownTotal.textContent = "$0";
      return;
    }

    // Dibujamos los productos usando la nueva propiedad 'cantidad'
    carrito.forEach(prod => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="item-info">
          <span>${prod.nombre} (x${prod.cantidad})</span>
          <span>$${prod.precio * prod.cantidad}</span>
        </div>
        <button data-id="${prod.id}" class="btn-eliminar">X</button>
      `;
      dropdownItems.appendChild(li);
    });

    dropdownTotal.textContent = `$${calcularTotal()}`;
  }

  // --- MANEJO DE EVENTOS ---

  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
      // IMPORTANTE: Asegúrate de que en tu HTML cada botón tenga data-id
      const idSeleccionado = boton.dataset.id || boton.dataset.nombre; 
      
      const productoExistente = carrito.find(p => p.id === idSeleccionado);

      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        carrito.push({
          id: idSeleccionado,
          nombre: boton.dataset.nombre,
          precio: Number(boton.dataset.precio),
          cantidad: 1
        });
      }

      guardarCarrito();
      actualizarContador();
      renderDropdown();
    });
  });

  iconoCarrito.addEventListener("click", () => {
    dropdown.classList.toggle("activo");
    renderDropdown();
  });

  dropdownItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const id = e.target.dataset.id;
      carrito = carrito.filter(p => p.id !== id);
      guardarCarrito();
      actualizarContador();
      renderDropdown();
    }
  });

  btnVaciar.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    actualizarContador();
    renderDropdown();
  });

  btnCheckout.addEventListener("click", () => {
    window.location.href = "./pages/checkout.html";
  });

  // --- CARGA INICIAL ---
  actualizarContador();
  renderDropdown();
});