document.addEventListener('DOMContentLoaded', () => {
    const mostrarCrearProductoBtn = document.getElementById('mostrar-crear-producto-btn');
    const crearProductoForm = document.getElementById('crear-producto-form');
    const editarProductoForm = document.getElementById('editar-producto-form');
    const listarProductosBtn = document.getElementById('listar-productos-btn');
    const listaProductos = document.getElementById('lista-productos');

   

    // Función para mostrar u ocultar el formulario de creación de productos
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
        const response = await fetch('/productos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
        crearProductoForm.reset();
        crearProductoForm.classList.add('hidden');
        listarProductos(); // Actualizar lista de productos después de crear uno nuevo
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
        const response = await fetch(`/productos/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
        editarProductoForm.reset();
        editarProductoForm.classList.add('hidden');
        listarProductos(); // Actualizar lista de productos después de editar uno
    });

    // Evento para listar productos existentes
    listarProductosBtn.addEventListener('click', listarProductos);

    const listarVentasBtn = document.getElementById('listarVentasBtn');
    const tablaVentasBody = document.getElementById('tablaVentasBody');

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

                li.querySelector('.boton-item').addEventListener('click', agregarAlCarritoCliked);
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
                    const response = await fetch(`/productos/${id}`, {
                        method: 'DELETE'
                    });
                    const result = await response.json();
                    alert(result.message);
                    listarProductos();
                });
            });
        } catch (error) {
            console.error('Error al listar los productos:', error);
            alert('Error al cargar los productos');
        }
    }
});
