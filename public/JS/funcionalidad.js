//visibilidad del carrito
var carritoVisible=false;

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}


function ready(){
    //funcionalidad de los botones eliminar
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i= 0; i < botonesEliminarItem.length; i++){
        var button = botonesEliminarItem [i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //funcionalidad boton agregar carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i= 0; i < botonesAgregarAlCarrito.length; i++){
        var button = botonesAgregarAlCarrito [i];
        button.addEventListener('click',agregarAlCarritoCliked);
    }

    //funcionalidad boton pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked);
}

//elmino el item del carrito
function eliminarItemCarrito(event){

    var buttonClicked = event.target;
    var carritoItem = buttonClicked.closest('.carrito-item');
    if (carritoItem) {
        carritoItem.remove();
    }

    // Se actualiza el total del carrito
    actualizarTotalCarrito();
    
}

//actualiza el total del; carrito
function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    // Recorremos cada elemento del carrito para sumar los precios
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        if (precioElemento) {
            var precio = parseFloat(precioElemento.innerText.replace('$', '').replace(',', ''));
            total += precio;
        }
    }

    // Redondeamos el total a dos decimales
    total = Math.round(total * 100) / 100;

    // Mostramos el total formateado en la interfaz
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}
function agregarItemAlCarrito(id, titulo, color, precio, imagenSrc) {
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Verificar si el item ya existe en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText === titulo) {
            alert("El elemento ya se encuentra en el carrito de compras");
            return;
        }
    }

    // Crear el nuevo elemento del carrito
    var item = document.createElement('div');
    item.classList.add('carrito-item');
    var itemCarritoContenido = `
        <div class="carrito-item">
            <img class="png-carrito" src="${imagenSrc}" alt="" width="80px">
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
            </span>
        </div>`;
    item.innerHTML = itemCarritoContenido;

    // Agregar evento para eliminar el item del carrito
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    // Agregar el nuevo item al carrito
    itemsCarrito.append(item);

    // Actualizar el total del carrito
    actualizarTotalCarrito();
}


function agregarItemAlCarrito(id,titulo,color,precio,imagenSrc){
    var item = document.createElement('div');
    item.classList.add('carrito-item');

    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlar si el item ya existe en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El elemento ya se encuentra en el carrito de compras");
            return;
        }
    }
    var itemCarritoContenido = `
        <div class="carrito-item">
            <img class="png-carrito" src="${imagenSrc}" alt="" width="80px">
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
            </span>
        </div>`;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    
    //funcion eliminar el nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);


}

function pagarClicked() {
    // Obtener todos los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-item');

    // Verificar si el carrito está vacío
    if (carritoItems.length === 0) {
        alert('El carrito está vacío. No se puede procesar la venta.');
        return;
    }

    // Preparar datos para enviar al servidor
    var productos = [];
    var totalText = document.querySelector('.carrito-precio-total').innerText;

    // Parsear y limpiar el total
    var total = parseFloat(totalText.replace(/[^\d.-]/g, '')); // Elimina caracteres no numéricos

    // Verificar que el total sea un número válido
    if (isNaN(total)) {
        alert('Error en el cálculo del total. No se puede procesar la venta.');
        return;
    }

    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var titulo = item.querySelector('.carrito-item-titulo').innerText;
        var color = item.querySelector('.carrito-item-color').innerText;
        var precio = item.querySelector('.carrito-item-precio').innerText;

        productos.push({ titulo: titulo, color: color, precio: precio });
    }

    // Realizar la solicitud POST al servidor
    fetch('/ventas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productos: productos, total: total.toString() }), // Convertir total a cadena de texto
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al registrar la venta');
        }
        return response.json();
    })
    .then(data => {
        // Mostrar mensaje de éxito o realizar otras acciones necesarias
        alert('Venta registrada exitosamente');
        
        // Limpiar el carrito
        var carritoItems = document.querySelector('.carrito-items');
        while (carritoItems.hasChildNodes()){
            carritoItems.removeChild(carritoItems.firstChild);
        }
        actualizarTotalCarrito();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al registrar la venta');
    });
}

