const formContainer = document.getElementById('form-container');
const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');

function crearFormulario(tipo) {
    formContainer.innerHTML = `
        <form id="auth-form" class="space-y-6 bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
            <h2 class="text-3xl font-bold text-gray-900">${tipo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
            <div class="space-y-4">
                <label class="block text-sm font-semibold text-gray-700">Nombre de usuario</label>
                <input id="username" type="text" placeholder="Escribe tu nombre" class="w-full rounded-3xl border border-gray-300 p-4 text-gray-900 focus:border-amber-500 focus:outline-none" required>
            </div>
            ${tipo === 'register' ? `
                <div class="space-y-4">
                    <label class="block text-sm font-semibold text-gray-700">Correo electrónico</label>
                    <input id="email" type="email" placeholder="tucorreo@ejemplo.com" class="w-full rounded-3xl border border-gray-300 p-4 text-gray-900 focus:border-amber-500 focus:outline-none" required>
                </div>
            ` : ''}
            <button type="submit" class="w-full rounded-3xl bg-black py-4 text-white font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition">${tipo === 'login' ? 'Ingresar' : 'Crear cuenta'}</button>
        </form>
    `;

    document.getElementById('auth-form').addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        if (!username) return;

        const rol = username.toLowerCase() === 'usuario_admin' ? 'Admin' : 'Cliente';
        const usuario = { nombre: username, rol };
        localStorage.setItem('usuarioLaElegancia', JSON.stringify(usuario));

        if (tipo === 'register') {
            window.location.href = 'productos.html';
            return;
        }

        if (rol === 'Admin') {
            window.location.href = 'admin.html';
            return;
        }

        window.location.href = 'productos.html';
    });
}

btnLogin.addEventListener('click', () => crearFormulario('login'));
btnRegister.addEventListener('click', () => crearFormulario('register'));

crearFormulario('login');
