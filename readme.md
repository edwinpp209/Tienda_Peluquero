# 💇‍♂️ La Elegancia - Professional Hair Supply Store

Una plataforma de E-commerce moderna para una tienda de peluquería profesional. Sistema completo de gestión de productos, carrito de compras persistente y panel administrativo.

## ✨ Características Principales

- **Catálogo Dinámico**: Productos organizados en 3 categorías (Herramientas, Cuidado, Tratamientos)
- **Carrito de Compras Avanzado**: Sistema con localStorage para persistencia de datos
- **Interfaz Sidebar**: Carrito lateral que no interrumpe la navegación
- **Filtrado de Productos**: Búsqueda por categoría en tiempo real
- **Formulario de Checkout**: Modal elegante para procesar compras
- **Almacenamiento Local**: Los datos de compras se guardan en localStorage
- **Diseño Responsivo**: Interfaz adaptable a todos los dispositivos
- **Autenticación**: Sistema de login y perfiles diferenciados

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **Tailwind CSS**: Framework de estilos utilitarios
- **JavaScript (ES6+)**: Lógica con Programación Orientada a Objetos (POO)
- **FontAwesome 6.0**: Iconografía profesional
- **localStorage**: Persistencia de datos del navegador

## 📁 Estructura del Proyecto

```
├── index.html                 # Página principal con hero section y ofertas
├── productos.html             # Catálogo con filtros y carrito lateral
├── login.html                 # Página de autenticación
├── admin.html                 # Panel administrativo
│
├── css/
│   └── styles.css            # Estilos personalizados y animaciones
│
└── js/
    ├── productsData.js        # Base de datos de productos (array PRODUCTOS)
    ├── cart.js                # Funciones core del carrito (localStorage)
    ├── script.js              # Lógica principal (Clases Carrito y Tienda)
    ├── productos.js           # Lógica de página productos.html
    ├── login.js               # Lógica de autenticación
    └── admin.js               # Lógica del panel administrativo
```

## 🚀 Cómo Inicializar el Proyecto

### 1. **Abriendo el Proyecto**
   - Clona o descarga este repositorio
   - Abre `index.html` en tu navegador (no requiere servidor)
   - O usa un servidor local: `python -m http.server 8000`

### 2. **Primera Vez - Estructura de Datos**
   El proyecto utiliza `localStorage` del navegador para guardar:
   - **Carrito**: `carritoLaElegancia` (array de productos con cantidad)
   - **Compras**: `comprasLaElegancia` (array de órdenes completadas)
   - **Usuario**: `usuarioLaElegancia` (datos de sesión)

### 3. **Navegación Principal**

#### **Página de Inicio** (`index.html`)
- Hero section atractivo
- Sección de ofertas especiales
- Catálogo con filtros por categoría
- Carrito flotante (sidebar)

#### **Tienda de Productos** (`productos.html`)
- Catálogo completo con 3 categorías
- Filtros dinámicos
- Carrito permanente en sidebar
- Sistema de búsqueda por categoría

#### **Login** (`login.html`)
- Acceso de usuarios
- Usuario especial: `usuario_admin` (para panel administrativo)

#### **Panel Admin** (`admin.html`)
- Visualización de compras realizadas
- Gestión avanzada de inventario

## 📦 Sistema de Carrito

### **Funciones Principales** (`js/cart.js`)
```javascript
obtenerCarrito()           // Obtiene el carrito actual
guardarCarrito(carrito)    // Guarda cambios en localStorage
agregarAlCarrito(id)       // Agrega un producto por ID
eliminarDelCarrito(id)     // Elimina un producto
vaciarCarrito()            // Vacía completamente el carrito
calcularTotal(carrito)     // Calcula el total
actualizarContadoresGlobales() // Actualiza badge del carrito
```

### **Clase Carrito** (`js/script.js` y `js/productos.js`)
```javascript
class Carrito {
    constructor()           // Inicializa desde localStorage
    agregarProducto(obj)    // Agrega producto y abre carrito
    eliminarProducto(id)    // Elimina producto
    vaciarCarrito()         // Vacía el carrito
    calcularTotal()         // Retorna el total
    actualizarUI()          // Renderiza la interfaz
}
```

## 🛒 Flujo de Compra

1. **Explorar Productos**: Navega a `productos.html`
2. **Filtrar**: Selecciona categoría (Todos, Herramientas, Cuidado, Tratamientos)
3. **Agregar al Carrito**: Click en botón "AÑADIR A LA BOLSA"
4. **Abrir Carrito**: Click en icono de cesta en el header
5. **Revisar Items**: Ve todos los productos seleccionados
6. **Finalizar Compra**: Click en botón "Finalizar Compra"
7. **Completar Formulario**: Ingresa datos personales
8. **Confirmar**: Se guarda la compra en localStorage

## 💾 Almacenamiento Local

### **Estructura de Carrito** (localStorage)
```javascript
{
  id: 1,
  nombre: "Secador Profesional",
  precio: 150000,
  imagen: "url...",
  categoria: "Herramientas",
  cantidad: 2
}
```

### **Estructura de Compra Guardada**
```javascript
{
  nombre: "Juan Pérez",
  telefono: "123456789",
  email: "juan@email.com",
  direccion: "Calle 123, Apto 4B",
  total: 450000,
  productos: [...],
  fecha: "12/5/2026"
}
```

## 🎨 Paleta de Colores

- **Primario**: Negro (#000000)
- **Secundario**: Oro/Ámbar (#D4AF37)
- **Fondo**: Gris claro (#F8FAFC)
- **Degradado**: Hair-gradient (personalizado en CSS)

## ⚙️ Configuración

### **Datos de Productos** (`js/productsData.js`)
Edita el array `PRODUCTOS` para añadir/modificar productos:
```javascript
const PRODUCTOS = [
  {
    id: 1,
    nombre: "Secador Profesional",
    precio: 150000,
    categoria: "Herramientas",
    imagen: "url..."
  },
  // ... más productos
];
```

### **Estilos Personalizados** (`css/styles.css`)
- Animaciones personalizadas
- Clases utility adicionales
- Efectos hover avanzados

## 🔐 Usuarios Demo

- **Usuario Admin**: `usuario_admin` (acceso a panel administrativo)
- **Usuario Normal**: Cualquier nombre de usuario registrado

## 📱 Responsividad

La página está optimizada para:
- ✅ Móviles (320px+)
- ✅ Tablets (768px+)
- ✅ Desktops (1024px+)
- ✅ Pantallas Ultra-wide (1280px+)

## 🔧 Requisitos

- Navegador moderno con soporte para:
  - ES6+ JavaScript
  - localStorage
  - CSS Grid y Flexbox
- Conexión a internet (para Tailwind CDN y FontAwesome)

## 📝 Notas Importantes

1. **localStorage**: Los datos se guardan localmente en el navegador
2. **Sincronización**: El carrito se sincroniza entre pestañas automáticamente
3. **Eliminación de Datos**: Limpiar cache borrará el historial de compras
4. **Validación**: El formulario de checkout requiere todos los campos

## 🚢 Despliegue

Para subir a producción:
1. Verificar que todos los archivos estén en el mismo directorio
2. Asegurar que las rutas de recursos son correctas
3. Probar en múltiples navegadores
4. (Opcional) Configurar un backend para almacenar datos permanentemente

## 👨‍💻 Desarrollo

El código está estructurado con:
- **POO**: Clases `Carrito` y `Tienda`
- **Programación Funcional**: Funciones helper en `cart.js`
- **Event Listeners**: Manejo de eventos dinamizado
- **localStorage API**: Persistencia de datos

---

**Versión**: 1.0  
**Última actualización**: Mayo 2026  
**Estado**: ✅ Funcional