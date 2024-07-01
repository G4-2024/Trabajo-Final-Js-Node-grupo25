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
function actualizarTotalCarrito(){
    
    // selección del contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    // recorrido de cada elemento del carrito para actualizar el total
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        if (precioElemento) {
            var precio = parseFloat(precioElemento.innerText.replace('$', '').replace(',', ''));
            total += precio;
        }
        
    }

    total = Math.round(total/2*100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
    

}
function agregarAlCarritoCliked(event){
    var button = event.target;
    var item = button.parentElement;
    var id = item.getElementsByClassName('id-item')[0].innerText;
    console.log(id);
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var color = item.getElementsByClassName('color-item')[0].innerText;
    console.log(color);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    console.log(precio);
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    //funcion para agregar el producto al carrito
    agregarItemAlCarrito(id,titulo,color,precio,imagenSrc);

    //actualiza el total del carrito
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

function pagarClicked(){
    alert("Gracias por su compra");

    //se elimina los items del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
}


