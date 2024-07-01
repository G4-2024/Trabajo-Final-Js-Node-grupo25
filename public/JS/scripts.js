//================================Funcionalidad del CRUD=====================================

//=================================Productos=================================================
document.addEventListener('DOMContentLoaded', ()=>
    {
        const mostrarCrearProductoBtn = document.getElementById('mostrar-crear-producto-btn');
    
        const crearProductoForm = document.getElementById('crear-producto-form');
    
        const editarProductoForm= document.getElementById('editar-producto-form');
    
        const listarProductosBtn= document.getElementById('listar-productos-btn');
    
        const listaProductos= document.getElementById('lista-productos');
    
        //mostrar o ocultar form
    
        mostrarCrearProductoBtn.addEventListener('click', () =>
        {
            crearProductoForm.classList.toggle('hidden');
        });

        //crear usuarios

        crearProductoForm.addEventListener('submit', async (e) =>
        {
            e.preventDefault();
            const formData = new FormData(crearProductoForm);

            const data =
            {
                titulo : formData.get('titulo'),
                color : formData.get('color'),
                precio : formData.get('precio')
            };
            const response = await fetch('/productos',
                {
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
            listaProductos();

        });
        //===============editar productos=============
        
        editarProductoForm.addEventListener('submit',async (e) =>
        {
            e.preventDefault();
            const formData = new FormData(editarProductoForm);

            const id = formData.get('editId-producto');
            const data =
            {
                titulo : formData.get('edit-titulo'),
                color : formData.get('edit-color'),
                precio : formData.get('edit-precio')
            };

            const response = await fetch (`/productos/${id}`,
            {
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
            listaProductos();

        } );

        //================listar los productos============
    
        listarProductosBtn.addEventListener('click', listarProductos);


        async function listarProductos()
        {
            const response = await fetch('/productos');
            const productos = await response.json();

            listaProductos.innerHTML = '';

            productos.forEach(producto =>
            {
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
                                    <button class="update" data-id= "${producto.id}" data-titulo="${producto.titulo}" data-color="${producto.color}" data-precio="${producto.precio}" > Modificar  </button>
                                    <button class="delete" data-id= "${producto.id}" > Eliminar </button>
                                </div> 
                            </div> 
                            `;
                listaProductos.appendChild(li);

                //Añadimos el evento click para agregar al carrito
                li.querySelector('.boton-item').addEventListener('click', agregarAlCarritoCliked);

                //Actualizar producto
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

                // document.querySelectorAll('.update').forEach(button=>{
                //     button.addEventListener('click', (e)=>{
                //         const id= e.target.getAttribute('data-id');
                //         const titulo= e.target.getAttribute('data-titulo');
                //         const color= e.target.getAttribute('data-color');
                //         const precio= e.target.getAttribute('data-precio');

                //         document.getElementById('editId-producto').value = id;
                //         document.getElementById('edit-titulo').value = titulo;
                //         document.getElementById('edit-color').value = color;
                //         document.getElementById('edit-precio').value = precio;
                //         editar-producto-form.classList.remove('hidden');
                //     });
                // });
                //eliminar producto
                li.querySelector('.delete').addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    const response = await fetch(`/productos/${id}`, {
                        method: 'DELETE'
                    });
        
                    const result = await response.json();
                    alert(result.message);
                    listarProductos();
                });


                // document.querySelectorAll('.delete').forEach(button=>{
                //     button.addEventListener('click',async (e)=>{
                //         const id = e.target.getAttribute('data-id');
                //         const response = await fetch(`/productos/${id}`,
                //             {
                //                 method : 'DELETE'
                //             }
                //         );

                //         const result = await response.json();
                //         alert (result.message);
                //         listarProductos();

                //     })
                // });
                
            });
        }
    
});
