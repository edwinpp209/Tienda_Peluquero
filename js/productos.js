const btnsFiltrar = document.querySelectorAll('.filter-btn');
const grid = document.getElementById('product-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const clearCartBtn = document.getElementById('clear-cart');

function agregarAlCarritoLocal(productoId) {
    window.agregarAlCarrito(productoId);
    renderizarCarrito();
}

function renderizarProductos(categoria = 'all') {
    const filtrados = categoria === 'all' ? PRODUCTOS : PRODUCTOS.filter(p => p.categoria === categoria);
    grid.innerHTML = filtrados.map(producto => `
        <article class="group overflow-hidden rounded-[2rem] bg-slate-50 p-6 shadow-xl border border-gray-200 transition hover:-translate-y-1">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="mb-6 h-64 w-full rounded-[2rem] object-cover">
            <div class="space-y-4">
                <div>
                    <p class="text-sm uppercase tracking-[0.2em] text-amber-500">${producto.categoria}</p>
                    <h3 class="text-2xl font-bold text-gray-900 mt-2">${producto.nombre}</h3>
                </div>
                <p class="text-xl font-bold text-gray-900">$${producto.precio.toLocaleString('es-AR')}</p>
                <button onclick="agregarAlCarritoLocal(${producto.id})" class="w-full rounded-3xl bg-black py-4 text-white uppercase tracking-[0.2em] hover:bg-amber-600 transition">Agregar</button>
            </div>
        </article>
    `).join('');
}

function renderizarCarrito() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        cartSidebar.innerHTML = '<p class="text-gray-500">El carrito está vacío.</p>';
    } else {
        cartSidebar.innerHTML = carrito.map(item => `
            <div class="rounded-3xl bg-white p-4 shadow-sm border border-gray-200">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h4 class="font-semibold text-gray-900">${item.nombre}</h4>
                        <p class="text-sm text-gray-500">x${item.cantidad} • $${item.precio.toLocaleString('es-AR')}</p>
                    </div>
                    <button onclick="window.eliminarDelCarrito(${item.id})" class="text-amber-500 hover:text-amber-700"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `).join('');
    }

    cartTotal.textContent = `$${calcularTotal(carrito).toLocaleString('es-AR')}`;
    cartCount.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
}

function configurarFiltros() {
    btnsFiltrar.forEach(btn => {
        btn.addEventListener('click', () => {
            btnsFiltrar.forEach(b => b.classList.remove('bg-black', 'text-white'));
            btn.classList.add('bg-black', 'text-white');
            renderizarProductos(btn.dataset.category);
        });
    });
}

clearCartBtn.addEventListener('click', () => {
    vaciarCarrito();
    renderizarCarrito();
});

renderizarProductos();
renderizarCarrito();
configurarFiltros();
