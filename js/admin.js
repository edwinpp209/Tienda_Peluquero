function obtenerUsuario() {
    const raw = localStorage.getItem('usuarioLaElegancia');
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function cerrarSesion() {
    localStorage.removeItem('usuarioLaElegancia');
    window.location.href = 'login.html';
}

function cargarPanelAdmin() {
    const usuario = obtenerUsuario();
    if (!usuario || usuario.rol !== 'Admin') {
        window.location.href = 'login.html';
        return;
    }

    document.title = `Panel Admin | ${usuario.nombre}`;
    document.getElementById('logout-button').addEventListener('click', cerrarSesion);

    const totalProductos = 10;
    const categorias = ['Herramientas', 'Cuidado', 'Tratamientos'];

    document.getElementById('admin-total-products').textContent = totalProductos;
    const categoriesList = document.getElementById('admin-categories');
    categoriesList.innerHTML = categorias.map(cat => `<li class="text-gray-200">• ${cat}</li>`).join('');
}

window.addEventListener('DOMContentLoaded', cargarPanelAdmin);
