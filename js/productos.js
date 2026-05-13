class Carrito {
    constructor() {
        this.items = obtenerCarrito();
        this.actualizarUI();
    }

    agregarProducto(producto) {
        const item = this.items.find(elemento => elemento.id === producto.id);
        if (item) {
            item.cantidad += 1;
        } else {
            this.items.push({ ...producto, cantidad: 1 });
        }
        guardarCarrito(this.items);
        this.actualizarUI();
        this.abrirCarrito();
    }

    eliminarProducto(id) {
        this.items = this.items.filter(item => item.id !== id);
        guardarCarrito(this.items);
        this.actualizarUI();
    }

    vaciarCarrito() {
        this.items = [];
        vaciarCarrito();
        this.actualizarUI();
    }

    calcularTotal() {
        return calcularTotal(this.items);
    }

    abrirCarrito() {
        document.getElementById('sidebar-cart').classList.remove('cart-hidden');
    }

    actualizarUI() {
        const cartItems = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');

        if (cartCount) {
            cartCount.textContent = this.items.reduce((sum, item) => sum + item.cantidad, 0);
        }
        if (cartTotal) {
            cartTotal.textContent = `$${this.calcularTotal().toLocaleString('es-AR')}`;
        }

        actualizarContadoresGlobales();

        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-center">
                    <i class="fas fa-shopping-bag text-5xl text-gray-200 mb-4"></i>
                    <p class="text-gray-400 font-light italic">Tu bolsa está esperando ser llenada...</p>
                    <a href="#product-grid" onclick="document.getElementById('sidebar-cart').classList.add('cart-hidden')" class="mt-6 text-amber-600 font-bold border-b border-amber-600 pb-1 text-sm">Ir a la tienda</a>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="flex items-center gap-5 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
                <div class="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img src="${item.imagen}" alt="${item.nombre}" class="w-full h-full object-cover">
                </div>
                <div class="flex-grow">
                    <h4 class="font-bold text-gray-800 text-sm">${item.nombre}</h4>
                    <p class="text-amber-600 font-bold">$${item.precio.toLocaleString('es-AR')}</p>
                    <p class="text-gray-500 text-xs">Cantidad: ${item.cantidad}</p>
                </div>
                <button onclick="carrito.eliminarProducto(${item.id})" class="w-8 h-8 text-gray-300 hover:text-red-500 transition" aria-label="Eliminar producto">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');
    }
}

// Función para mostrar el formulario de checkout
function mostrarFormularioCheckout() {
    const modal = document.createElement('div');
    modal.id = 'checkout-modal';
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-[2rem] max-w-md w-full shadow-2xl animate-fadeIn">
            <div class="bg-gradient-to-r from-amber-600 to-amber-700 p-8 rounded-t-[2rem]">
                <h2 class="text-2xl font-bold text-white mb-2">Finalizar Compra</h2>
                <p class="text-amber-100">Total: <span class="text-2xl font-bold">$${carrito.calcularTotal().toLocaleString('es-AR')}</span></p>
            </div>
            <form id="checkout-form" class="p-8 space-y-4">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Nombre Completo *</label>
                    <input type="text" name="nombre" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none" placeholder="Ej: Juan Pérez">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Teléfono *</label>
                    <input type="tel" name="telefono" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none" placeholder="Ej: 123456789">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <input type="email" name="email" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none" placeholder="Ej: juan@email.com">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Dirección *</label>
                    <input type="text" name="direccion" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none" placeholder="Ej: Calle 123, Apartamento 4B">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <button type="submit" class="bg-amber-600 text-white font-bold py-3 rounded-lg hover:bg-amber-700 transition-all">Confirmar Compra</button>
                    <button type="button" onclick="cerrarModalCheckout()" class="bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition-all">Cancelar</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const datos = {
            nombre: form.nombre.value,
            telefono: form.telefono.value,
            email: form.email.value,
            direccion: form.direccion.value,
            total: carrito.calcularTotal(),
            productos: carrito.items,
            fecha: new Date().toLocaleDateString('es-AR')
        };
        
        // Guardar en localStorage
        const compras = JSON.parse(localStorage.getItem('comprasLaElegancia')) || [];
        compras.push(datos);
        localStorage.setItem('comprasLaElegancia', JSON.stringify(compras));
        
        alert(`¡Compra confirmada!\n\nNombre: ${datos.nombre}\nEmail: ${datos.email}\nTotal: $${datos.total.toLocaleString('es-AR')}\n\nNos contactaremos pronto para coordinar la entrega.`);
        
        carrito.vaciarCarrito();
        cerrarCarrito();
        cerrarModalCheckout();
    });
}

function cerrarModalCheckout() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.remove();
    }
}

class Tienda {
    constructor() {
        this.catalogo = PRODUCTOS;
    }

    cargarCatalogo(filtro = 'all') {
        const grid = document.getElementById('product-grid');
        const listaFiltrada = filtro === 'all' ? this.catalogo : this.catalogo.filter(producto => producto.categoria === filtro);

        grid.innerHTML = listaFiltrada.map(producto => `
            <article class="product-card bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-100/50 border border-transparent hover:border-amber-100 flex flex-col group p-2">
                <div class="h-64 bg-gray-50 rounded-[2rem] flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-full object-cover">
                </div>
                <div class="p-8 flex-grow">
                    <span class="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">${producto.categoria}</span>
                    <h3 class="text-xl font-bold text-gray-800 mt-2 brand-font">${producto.nombre}</h3>
                    <p class="text-2xl font-bold text-gray-900 mt-4">$${producto.precio.toLocaleString('es-AR')}</p>
                </div>
                <div class="p-6 pt-0">
                    <button onclick="agregarProductoPorId(${producto.id})" class="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-amber-600 hover:text-black transition-all flex items-center justify-center gap-3 shadow-lg">
                        <i class="fas fa-plus text-xs"></i> AÑADIR A LA BOLSA
                    </button>
                </div>
            </article>
        `).join('');
    }
}

const tienda = new Tienda();
const carrito = new Carrito();

function agregarProductoPorId(id) {
    const producto = tienda.catalogo.find(item => item.id === id);
    if (!producto) return;
    carrito.agregarProducto(producto);
}

function cerrarCarrito() {
    document.getElementById('sidebar-cart').classList.add('cart-hidden');
}

window.addEventListener('DOMContentLoaded', () => {
    tienda.cargarCatalogo();

    document.getElementById('cart-toggle').addEventListener('click', () => {
        document.getElementById('sidebar-cart').classList.remove('cart-hidden');
    });
    document.getElementById('close-cart').addEventListener('click', cerrarCarrito);
    document.getElementById('clear-cart').addEventListener('click', () => carrito.vaciarCarrito());
    document.getElementById('checkout-button').addEventListener('click', () => {
        if (carrito.items.length === 0) {
            alert('Tu carrito está vacío. Agrega productos para finalizar la compra.');
            return;
        }
        mostrarFormularioCheckout();
    });

    document.querySelectorAll('#category-filters button').forEach(button => {
        button.addEventListener('click', (event) => {
            document.querySelectorAll('#category-filters button').forEach(btn => {
                btn.classList.remove('bg-black', 'text-white', 'shadow-lg');
                btn.classList.add('text-gray-500', 'hover:bg-gray-100');
            });
            event.currentTarget.classList.remove('text-gray-500', 'hover:bg-gray-100');
            event.currentTarget.classList.add('bg-black', 'text-white', 'shadow-lg');
            tienda.cargarCatalogo(event.currentTarget.dataset.category);
        });
    });
});
