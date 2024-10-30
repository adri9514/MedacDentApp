// script.js
document.getElementById('guardarCita').addEventListener('click', function() {
    // Recoger datos del formulario
    const fecha = document.getElementById('fecha').value;
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const apellidos = document.getElementById('apellidos').value;
    const telefono = document.getElementById('telefono').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const observaciones = document.getElementById('observaciones').value;

    // Limpiar errores previos
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    let isValid = true;

    // Validar los datos
    if (!fecha || !nombre || !dni || !apellidos || !telefono || !fechaNacimiento) {
        alert('Por favor, rellene todos los campos.');
        return;
    }
    if (isNaN(telefono)) {
        const telefonoField = document.getElementById('telefono');
        telefonoField.classList.add('error');
        const errorMessage = document.createElement('span');
        errorMessage.classList.add('error-message');
        errorMessage.innerText = 'El teléfono debe ser un número válido.';
        telefonoField.parentElement.appendChild(errorMessage);
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Crear objeto de cita
    const cita = {
        id: Date.now(),
        fecha,
        nombre,
        dni,
        apellidos,
        telefono,
        fechaNacimiento,
        observaciones
    };

    // Guardar cita en LocalStorage
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    citas.push(cita);
    localStorage.setItem('citas', JSON.stringify(citas));

    // Actualizar la tabla
    mostrarCitas();
});

function mostrarCitas() {
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    const tbody = document.querySelector('#citas tbody');
    tbody.innerHTML = '';

    if (citas.length === 0) {
        tbody.innerHTML = '<tr id="sin-citas"><td colspan="6">Dato vacío</td></tr>';
    } else {
        citas.forEach((cita, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${cita.fecha}</td>
                <td>${cita.nombre} ${cita.apellidos}</td>
                <td>${cita.dni}</td>
                <td>${cita.telefono}</td>
                <td>
                    <button onclick="eliminarCita(${cita.id})">Eliminar</button>
                    <button onclick="editarCita(${cita.id})">Editar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    }
}

function eliminarCita(id) {
    let citas = JSON.parse(localStorage.getItem('citas'));
    citas = citas.filter(cita => cita.id !== id);
    localStorage.setItem('citas', JSON.stringify(citas));
    mostrarCitas();
}

function editarCita(id) {
    const citas = JSON.parse(localStorage.getItem('citas'));
    const cita = citas.find(cita => cita.id === id);
    if (cita) {
        document.getElementById('fecha').value = cita.fecha;
        document.getElementById('nombre').value = cita.nombre;
        document.getElementById('dni').value = cita.dni;
        document.getElementById('apellidos').value = cita.apellidos;
        document.getElementById('telefono').value = cita.telefono;
        document.getElementById('fechaNacimiento').value = cita.fechaNacimiento;
        document.getElementById('observaciones').value = cita.observaciones;
        eliminarCita(id);
    }
}

// Mostrar citas al cargar la página
window.onload = mostrarCitas;