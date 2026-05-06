const CART_KEY = 'carritoLaElegancia';

function obtenerCarrito() {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
    actualizarContadoresGlobales();
}

function calcularTotal(carrito) {
    return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

function actualizarContadoresGlobales() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = calcularTotal(carrito);

    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = totalItems;
    });

    document.querySelectorAll('#cart-total').forEach(el => {
        el.textContent = `$${totalPrecio.toLocaleString('es-AR')}`;
    });
}

function agregarAlCarrito(productoId) {
    const carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === productoId);
    if (item) {
        item.cantidad += 1;
    } else {
        const producto = PRODUCTOS.find(p => p.id === productoId);
        if (!producto) return;
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito(carrito);
}

function eliminarDelCarrito(productoId) {
    const carrito = obtenerCarrito().filter(item => item.id !== productoId);
    guardarCarrito(carrito);
}

function vaciarCarrito() {
    guardarCarrito([]);
}

window.obtenerCarrito = obtenerCarrito;
window.guardarCarrito = guardarCarrito;
window.calcularTotal = calcularTotal;
window.actualizarContadoresGlobales = actualizarContadoresGlobales;
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.vaciarCarrito = vaciarCarrito;
