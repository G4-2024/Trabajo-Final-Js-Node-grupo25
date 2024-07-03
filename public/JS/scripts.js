document.addEventListener('DOMContentLoaded', () => {
    const listaProductos = document.getElementById('lista-productos');
    const crearProductoForm = document.getElementById('crear-producto-form');
    const editarProductoForm = document.getElementById('editar-producto-form');
    const tablaVentasBody = document.getElementById('tablaVentasBody');
    const carritoContenedor = document.querySelector('.carrito-items');
    const carritoTotalElement = document.querySelector('.carrito-precio-total');

    // Evento para mostrar u ocultar el formulario de creación de productos
    const mostrarCrearProductoBtn = document.getElementById('mostrar-crear-producto-btn');
    mostrarCrearProductoBtn.addEventListener('click', () => {
        crearProductoForm.classList.toggle('hidden');
    });

    // Evento para crear un nuevo producto
    crearProductoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(crearProductoForm);
        const data = {
            titulo: formData.get('titulo'),
            color: formData.get('color'),
            precio: formData.get('precio')
        };
        try {
            const response = await fetch('/productos', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }
            const result = await response.json();
            alert(result.message);
            crearProductoForm.reset();
            crearProductoForm.classList.add('hidden');
            listarProductos(); // Actualizar lista de productos después de crear uno nuevo
        } catch (error) {
            console.error('Error al crear el producto:', error);
            alert('Error al crear el producto');
        }
    });

    // Evento para editar un producto existente
    editarProductoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(editarProductoForm);
        const id = formData.get('editId-producto');
        const data = {
            titulo: formData.get('edit-titulo'),
            color: formData.get('edit-color'),
            precio: formData.get('edit-precio')
        };
        try {
            const response = await fetch(`/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Error al editar el producto');
            }
            const result = await response.json();
            alert(result.message);
            editarProductoForm.reset();
            editarProductoForm.classList.add('hidden');
            listarProductos(); // Actualizar lista de productos después de editar uno
        } catch (error) {
            console.error('Error al editar el producto:', error);
            alert('Error al editar el producto');
        }
    });

    // Evento para listar productos existentes
    const listarProductosBtn = document.getElementById('listar-productos-btn');
    listarProductosBtn.addEventListener('click', listarProductos);

    // Evento para listar ventas
    const listarVentasBtn = document.getElementById('listarVentasBtn');
    listarVentasBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/ventas'); // Ajusta la ruta según la implementación en tu servidor
            if (!response.ok) {
                throw new Error('Error al obtener las ventas');
            }
            const ventas = await response.json();

            tablaVentasBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de mostrar nuevos datos

            // Crear filas de la tabla para cada venta
            ventas.forEach(venta => {
                const row = document.createElement('tr');
                const fecha = new Date(venta.fecha).toLocaleString();
                row.innerHTML = `
                    <td>${venta.id}</td>
                    <td>${venta.productos}</td>
                    <td>${venta.total}</td>
                    <td>${fecha}</td>
                `;
                tablaVentasBody.appendChild(row);
            });

            // Alternar la visibilidad de tablaVentas
            tablaVentasBody.classList.toggle('hidden');
        } catch (error) {
            console.error('Error al cargar las ventas:', error);
            alert('Error al cargar las ventas');
        }
    });

    // Función para listar productos desde el servidor
    async function listarProductos() {
        try {
            const response = await fetch('/productos');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const productos = await response.json();

            listaProductos.innerHTML = '';

            productos.forEach(producto => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="item">
                        <span class="id-item">${producto.id}</span>
                        <span class="titulo-item">${producto.titulo}</span>
                        <img src="/IMG/zapatillaGenerica.jpg" alt="" class="img-item">
                        <span class="color-item">${producto.color}</span>
                        <span class="precio-item">${producto.precio}</span>
                        <button class="boton-item">Agregar al Carrito</button>
                        <div class="actions">
                            <button class="update" data-id="${producto.id}" data-titulo="${producto.titulo}" data-color="${producto.color}" data-precio="${producto.precio}">Modificar</button>
                            <button class="delete" data-id="${producto.id}">Eliminar</button>
                        </div>
                    </div>`;
                listaProductos.appendChild(li);

                li.querySelector('.boton-item').addEventListener('click', agregarAlCarritoClicked);
                li.querySelector('.update').addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    const titulo = e.target.getAttribute('data-titulo');
                    const color = e.target.getAttribute('data-color');
                    const precio = e.target.getAttribute('data-precio');
                    document.getElementById('editId-producto').value = id;
                    document.getElementById('edit-titulo').value = titulo;
                    document.getElementById('edit-color').value = color;
                    document.getElementById('edit-precio').value = precio;
                    editarProductoForm.classList.remove('hidden');
                });
                li.querySelector('.delete').addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    try {
                        const response = await fetch(`/productos/${id}`, {
                            method: 'DELETE'
                        });
                        if (!response.ok) {
                            throw new Error('Error al eliminar el producto');
                        }
                        const result = await response.json();
                        alert(result.message);
                        listarProductos();
                    } catch (error) {
                        console.error('Error al eliminar el producto:', error);
                        alert('Error al eliminar el producto');
                    }
                });
            });
        } catch (error) {
            console.error('Error al listar los productos:', error);
            alert('Error al cargar los productos');
        }
    }

    // Función para agregar producto al carrito
    function agregarAlCarritoClicked(event) {
        const button = event.target;
        const item = button.parentElement;
        const id = item.querySelector('.id-item').innerText;
        const titulo = item.querySelector('.titulo-item').innerText;
        const color = item.querySelector('.color-item').innerText;
        const precio = item.querySelector('.precio-item').innerText;

        agregarItemAlCarrito(id, titulo, color, precio);
    }

    // Función para agregar item al carrito
    function agregarItemAlCarrito(id, titulo, color, precio) {
        const item = document.createElement('div');
        item.classList.add('carrito-item');
        item.innerHTML = `
            <img class="png-carrito" src="/IMG/zapatillaGenerica.jpg" alt="" width="80px">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                </div>
                <span class="carrito-item-color">${color}</span>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <span class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </span>`;
        
        // Verificar si el producto ya está en el carrito
        const existentes = carritoContenedor.getElementsByClassName('carrito-item-titulo');
        for (let existente of existentes) {
            if (existente.innerText === titulo) {
                alert('El producto ya está en el carrito.');
                return;
            }
        }

        // Agregar evento para eliminar el producto del carrito
        item.querySelector('.btn-eliminar').addEventListener('click', () => {
            item.remove();
            actualizarTotalCarrito();
        });

        // Agregar el item al carrito
        carritoContenedor.appendChild(item);
        actualizarTotalCarrito();
    }

    // Función para actualizar el total del carrito
    function actualizarTotalCarrito() {
        let total = 0;
        const items = carritoContenedor.getElementsByClassName('carrito-item');
        for (let item of items) {
            const precioString = item.querySelector('.carrito-item-precio').innerText;
            const precio = parseFloat(precioString.replace('$', ''));
            total += precio;
        }
        carritoTotalElement.innerText = `Total: $${total.toFixed(2)}`;
    }

    // Evento para registrar la venta
    const registrarVentaBtn = document.getElementById('registrarVentaBtn');
    registrarVentaBtn.addEventListener('click', async () => {
        const productos = [];
        const items = carritoContenedor.getElementsByClassName('carrito-item');
        for (let item of items) {
            const titulo = item.querySelector('.carrito-item-titulo').innerText;
            const cantidad = parseInt(item.querySelector('.carrito-item-cantidad').value);
            const color = item.querySelector('.carrito-item-color').innerText;
            const precio = parseFloat(item.querySelector('.carrito-item-precio').innerText.replace('$', ''));
            productos.push({ titulo, cantidad, color, precio });
        }

        const data = {
            productos: productos,
            total: calcularTotalCarrito()
        };

        try {
            const response = await fetch('/ventas', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Error al registrar la venta');
            }
            const result = await response.json();
            alert(result.message);
            vaciarCarrito();
        } catch (error) {
            console.error('Error al registrar la venta:', error);
            alert('Error al registrar la venta');
        }
    });

    // Función para vaciar el carrito
    function vaciarCarrito() {
        carritoContenedor.innerHTML = '';
        carritoTotalElement.innerText = 'Total: $0.00';
    }

    // Función para calcular el total del carrito
    function calcularTotalCarrito() {
        let total = 0;
        const items = carritoContenedor.getElementsByClassName('carrito-item');
        for (let item of items) {
            const precioString = item.querySelector('.carrito-item-precio').innerText;
            const precio = parseFloat(precioString.replace('$', ''));
            total += precio;
        }
        return total.toFixed(2);
    }

    // Inicializar la lista de productos al cargar la página
    listarProductos();
});
