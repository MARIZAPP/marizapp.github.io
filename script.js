// ============================================================
//  DATOS DE PRODUCTOS
//  👉 Para agregar un producto nuevo, copia un bloque { ... }
//     dentro del arreglo "productos" y cambia los valores.
//
//  Campos:
//    id        → número único (no repetir)
//    nombre    → nombre del producto
//    categoria → modelo o tipo (ej: "Blusas", "Pantalones", etc.)
//    precio    → número (sin símbolo de moneda)
//    tallas    → arreglo de tallas disponibles
//    descripcion → texto breve
//    imagen    → URL de imagen ó "" para mostrar ícono
//    nuevo     → true = muestra badge "NUEVO"
// ============================================================

const productos = [
  {
    id: 1,
    nombre: "Chaleco formal invierno",
    categoria: "Chalecos",
    precio: 405,
    tallas: ["XS", "S", "M", "L"],
    descripcion: "Chaleco formal para invierno con bordado.",
    imagen: "https://raw.githubusercontent.com/MARIZAPP/marizapp.github.io/main/CHALECO-40-BS.jpg",
    nuevo: true
  },
  {
    id: 2,
    nombre: "Canguro para hombre",
    categoria: "Canguros",
    precio: 60,
    tallas: ["28", "30", "32", "34"],
    descripcion: "Canguro deportivo para invierno.",
    imagen: "https://raw.githubusercontent.com/MARIZAPP/marizapp.github.io/main/CANGURO%2080%20BS%20.jpg",
    nuevo: true
  },
  {
    id: 3,
    nombre: "Chaleco azul con gorro",
    categoria: "Chalecos",
    precio: 60,
    tallas: ["S", "M", "L", "XL"],
    descripcion: "Chaleco azul con gorro impermiablea.",
    imagen: "https://raw.githubusercontent.com/MARIZAPP/marizapp.github.io/main/CHALECO%20AZUL%2060%20BS.jpg",
    nuevo: false
  },
  {
    id: 4,
    nombre: "Chaleco color crema",
    categoria: "Chalecos",
    precio: 40,
    tallas: ["S", "M", "L", "XL", "XXL"],
    descripcion: "Chaleco crema formal de invierno.",
    imagen: "https://raw.githubusercontent.com/MARIZAPP/marizapp.github.io/main/CHALECO%20CREMA%2040%20BS.jpg",
    nuevo: false
  },
  {
    id: 5,
    nombre: "Chaleco impermiable color vino",
    categoria: "Chalecos",
    precio: 60,
    tallas: ["XS", "S", "M", "L"],
    descripcion: "chaleco de invierno impermiable.",
    imagen: "https://raw.githubusercontent.com/MARIZAPP/marizapp.github.io/main/CHALECO%20IMPERMIABLE%2060%20BS.jpg",
    nuevo: true
  },
  {
    id: 6,
    nombre: "Chaleco formal negro",
    categoria: "Chalecos",
    precio: 40,
    tallas: ["S", "M", "L"],
    descripcion: "Chalecos formales para invierno.",
    imagen: "https://raw.githubusercontent.com/MARIZAPP/marizapp.github.io/main/CHALECO%20NEGRO%2040%20BS.jpg",
    nuevo: false
  },
  {
    id: 7,
    nombre: "Parca invierno color verde",
    categoria: "parcas",
    precio: 170,
    tallas: ["XS", "S", "M", "L", "XL"],
    descripcion: "parca verde para invierno frizada .",
    imagen: "https://raw.githubusercontent.com/MARIZAPP/marizapp.github.io/main/PARCA%20VERDE%20170%20BS.jpg",
    nuevo: true
  },
  {
    id: 8,
    nombre: "Chamarra deportiva color celeste",
    categoria: "Chamarras",
    precio: 50,
    tallas: ["S", "M", "L", "XL"],
    descripcion: "chamarra deportiva para invierno.",
    imagen: "https://raw.githubusercontent.com/MARIZAPP/marizapp.github.io/main/CHAMARA%20CELESTE%2050%20BS.jpg",
    nuevo: false
  }
];

// ============================================================
//  ÍCONOS POR CATEGORÍA (para cuando no hay imagen)
// ============================================================
const iconoCategoria = {
  "Blusas": "👚",
  "Pantalones": "👖",
  "Vestidos": "👗",
  "Camisetas": "👕",
  "Faldas": "🩱",
  "Chaquetas": "🧥",
  "Deportivo": "🩳",
  "Camisas": "👔"
};

// ============================================================
//  VARIABLES GLOBALES
// ============================================================
let categoriaActiva = "Todos";
let busqueda = "";

// ============================================================
//  INICIALIZACIÓN
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  mostrarFecha();
  crearFiltros();
  renderProductos();
  configurarBuscador();
  configurarModal();
});

// ============================================================
//  FECHA DE HOY
// ============================================================
function mostrarFecha() {
  const el = document.getElementById("fechaHoy");
  const hoy = new Date();
  const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  el.innerHTML = `${dias[hoy.getDay()]}, ${hoy.getDate()} ${meses[hoy.getMonth()]}<br>${hoy.getFullYear()}`;
}

// ============================================================
//  FILTROS DE CATEGORÍA
// ============================================================
function crearFiltros() {
  const categorias = ["Todos", ...new Set(productos.map(p => p.categoria))];
  const contenedor = document.getElementById("filtros");

  categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filtro-btn" + (cat === "Todos" ? " activo" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      categoriaActiva = cat;
      document.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
      renderProductos();
    });
    contenedor.appendChild(btn);
  });
}

// ============================================================
//  BUSCADOR
// ============================================================
function configurarBuscador() {
  const input = document.getElementById("buscador");
  const btnLimpiar = document.getElementById("btnLimpiar");

  input.addEventListener("input", () => {
    busqueda = input.value.trim().toLowerCase();
    renderProductos();
  });

  btnLimpiar.addEventListener("click", () => {
    input.value = "";
    busqueda = "";
    input.focus();
    renderProductos();
  });
}

// ============================================================
//  RENDERIZADO DE PRODUCTOS
// ============================================================
function renderProductos() {
  const lista = document.getElementById("listaProductos");
  const sinResultados = document.getElementById("sinResultados");
  const stats = document.getElementById("stats");

  // Filtrar
  let filtrados = productos.filter(p => {
    const coincideCategoria = categoriaActiva === "Todos" || p.categoria === categoriaActiva;
    const terminoBusqueda = busqueda;
    const coincideBusqueda =
      !terminoBusqueda ||
      p.nombre.toLowerCase().includes(terminoBusqueda) ||
      p.categoria.toLowerCase().includes(terminoBusqueda) ||
      p.descripcion.toLowerCase().includes(terminoBusqueda) ||
      p.tallas.some(t => t.toLowerCase().includes(terminoBusqueda)) ||
      String(p.precio).includes(terminoBusqueda);

    return coincideCategoria && coincideBusqueda;
  });

  // Stats
  stats.textContent = filtrados.length === 1
    ? "1 producto encontrado"
    : `${filtrados.length} productos encontrados`;

  // Sin resultados
  if (filtrados.length === 0) {
    lista.innerHTML = "";
    sinResultados.classList.remove("oculto");
    return;
  }
  sinResultados.classList.add("oculto");

  // Render tarjetas
  lista.innerHTML = "";
  filtrados.forEach((p, i) => {
    const tarjeta = crearTarjeta(p, i);
    lista.appendChild(tarjeta);
  });
}

// ============================================================
//  CREAR TARJETA
// ============================================================
function crearTarjeta(p, i) {
  const div = document.createElement("div");
  div.className = "tarjeta";
  div.style.animationDelay = `${i * 0.05}s`;

  // Imagen o placeholder
  const imgHTML = p.imagen
    ? `<img class="tarjeta-img" src="${p.imagen}" alt="${p.nombre}" loading="lazy" />`
    : `<div class="tarjeta-img-placeholder">${iconoCategoria[p.categoria] || "👕"}</div>`;

  // Badge nuevo
  const badgeHTML = p.nuevo ? `<span class="badge-nuevo">✨ Nuevo</span>` : "";

  // Tallas
  const tallasHTML = p.tallas.slice(0, 4).map(t => `<span>${t}</span>`).join(" ");

  div.innerHTML = `
    ${badgeHTML}
    ${imgHTML}
    <div class="tarjeta-body">
      <div class="tarjeta-categoria">${p.categoria}</div>
      <div class="tarjeta-nombre">${p.nombre}</div>
      <div class="tarjeta-talla">Tallas: ${tallasHTML}</div>
      <div class="tarjeta-precio">Bs. ${p.precio.toFixed(2)}</div>
    </div>
  `;

  div.addEventListener("click", () => abrirModal(p));
  return div;
}

// ============================================================
//  MODAL DETALLE
// ============================================================
function configurarModal() {
  const overlay = document.getElementById("modalOverlay");
  const cerrar = document.getElementById("modalCerrar");

  cerrar.addEventListener("click", cerrarModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) cerrarModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
  });
}

function abrirModal(p) {
  const overlay = document.getElementById("modalOverlay");
  const contenido = document.getElementById("modalContenido");

  const imgHTML = p.imagen
    ? `<img class="modal-img" src="${p.imagen}" alt="${p.nombre}" />`
    : `<div class="modal-img-placeholder">${iconoCategoria[p.categoria] || "👕"}</div>`;

  const tallasHTML = p.tallas.map(t =>
    `<span class="modal-chip">📐 ${t}</span>`
  ).join("");

  contenido.innerHTML = `
    ${imgHTML}
    <div class="modal-cat">${p.categoria}</div>
    <div class="modal-nombre">${p.nombre}</div>
    <div class="modal-precio">Bs. ${p.precio.toFixed(2)}</div>
    <div class="modal-info">
      ${tallasHTML}
      ${p.nuevo ? `<span class="modal-chip">✨ Nuevo</span>` : ""}
    </div>
    <div class="modal-desc-label">Descripción</div>
    <div class="modal-desc">${p.descripcion}</div>
  `;

  overlay.classList.remove("oculto");
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.add("oculto");
  document.body.style.overflow = "";
}
