const { json } = require("express");

// archivo validacion.js
function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const direccion = document.getElementById('direccion').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value; 

    // Validación básica
    if (nombre.trim() === '' || correo.trim() === '' || apellido.trim() === ''|| direccion.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return false;
    }

    // Validación de formato de correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        alert('Ingresa un correo electrónico válido.');
        return false;
    }

    // Validación de formato de numero telefono
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
        alert("Por favor, introduce un número de teléfono válido (10 dígitos).");
        return false; 
    }
    return true;
}








    

