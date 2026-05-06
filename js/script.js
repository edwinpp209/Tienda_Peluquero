// Lógica POO para La Elegancia

class Producto {
    constructor(id, nombre, precio, categoria, icono) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.icono = icono;
    }
}

class Carrito {
    constructor() {
        this.items = [];
    }

    agregarProducto(producto) {
        this.items.push(producto);
        this.actualizarUI();
        this.abrirCarrito();
    }

    eliminarProducto(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        this.actualizarUI();
    }

    vaciarCarrito() {
        this.items = [];
        this.actualizarUI();
    }

    calcularTotal() {
        return this.items.reduce((total, item) => total + item.precio, 0);
    }

    abrirCarrito() {
        document.getElementById('sidebar-cart').classList.remove('cart-hidden');
    }

    actualizarUI() {
        const cartItems = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');

        cartCount.textContent = this.items.length;
        cartTotal.textContent = `$${this.calcularTotal().toLocaleString()}`;

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-center">
                    <i class="fas fa-shopping-bag text-5xl text-gray-200 mb-4"></i>
                    <p class="text-gray-400 font-light italic">Tu bolsa está esperando ser llenada...</p>
                    <a href="#tienda" onclick="document.getElementById('sidebar-cart').classList.add('cart-hidden')" class="mt-6 text-amber-600 font-bold border-b border-amber-600 pb-1 text-sm">Ir a la tienda</a>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="flex items-center gap-5 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
                <div class="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-3xl">
                    ${item.icono}
                </div>
                <div class="flex-grow">
                    <h4 class="font-bold text-gray-800 text-sm">${item.nombre}</h4>
                    <p class="text-amber-600 font-bold">$${item.precio.toLocaleString()}</p>
                </div>
                <button onclick="carrito.eliminarProducto(${item.id})" class="w-8 h-8 text-gray-300 hover:text-red-500 transition" aria-label="Eliminar producto">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');
    }
}

class Tienda {
    constructor() {
        this.catalogo = [
            new Producto(1, 'Tijeras de Precisión Gold', 120000, 'Herramientas', '✂️'),
            new Producto(2, 'Secador Iónico 3000W', 250000, 'Herramientas', '💨'),
            new Producto(3, 'Champú Restauración', 45000, 'Cuidado', '🧴'),
            new Producto(4, 'Plancha Titanium Master', 350000, 'Herramientas', '💇‍♀️'),
            new Producto(5, 'Tratamiento Argán Oro', 45000, 'Tratamientos', '✨'),
            new Producto(6, 'Tinte Profesional Silk', 25000, 'Tratamientos', '🎨'),
            new Producto(7, 'Cepillo Térmico Pro', 45000, 'Herramientas', '🪮'),
            new Producto(8, 'Spray Fijación Premium', 18000, 'Cuidado', '🧪'),
            new Producto(9, 'Mascarilla de Coco', 32000, 'Cuidado', '🥥'),
            new Producto(10, 'Capa Profesional Black', 55000, 'Herramientas', '👘')
        ];
    }

    cargarCatalogo(filtro = 'all') {
        const grid = document.getElementById('product-grid');
        const listaFiltrada = filtro === 'all' ? this.catalogo : this.catalogo.filter(producto => producto.categoria === filtro);

        grid.innerHTML = listaFiltrada.map(producto => `
            <article class="product-card bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-100/50 border border-transparent hover:border-amber-100 flex flex-col group p-2">
                <div class="h-64 bg-gray-50 rounded-[2rem] flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-500">
                    ${producto.icono}
                </div>
                <div class="p-8 flex-grow">
                    <span class="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">${producto.categoria}</span>
                    <h3 class="text-xl font-bold text-gray-800 mt-2 brand-font">${producto.nombre}</h3>
                    <p class="text-2xl font-bold text-gray-900 mt-4">$${producto.precio.toLocaleString()}</p>
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
        alert(`Compra finalizada. Total: $${carrito.calcularTotal().toLocaleString()}`);
        carrito.vaciarCarrito();
        cerrarCarrito();
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