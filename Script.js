class Cita {
    constructor(fecha, nombre, apellido, dni, telefono, fechaNacimiento, observaciones) {
        this.id = Date.now();
        this.fecha = fecha;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.observaciones = observaciones;
    }
}

document.getElementById("formulario-cita").addEventListener("submit", function(event) {
    event.preventDefault();
    agregarCita();
});

function agregarCita() {
    const fecha = document.getElementById("fecha").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const observaciones = document.getElementById("observaciones").value;

    if (!validarTelefono(telefono)) {
        alert("El teléfono debe contener solo números.");
        document.getElementById("telefono").classList.add("error");
        return;
    } else {
        document.getElementById("telefono").classList.remove("error");
    }

    const nuevaCita = new Cita(fecha, nombre, apellido, dni, telefono, fechaNacimiento, observaciones);
    guardarCita(nuevaCita);
    mostrarCitas();
}

function validarTelefono(telefono) {
    return /^\d+$/.test(telefono);
}

function guardarCita(cita) {
    let citas = JSON.parse(localStorage.getItem("citas")) || [];
    citas.push(cita);
    localStorage.setItem("citas", JSON.stringify(citas));
}

function mostrarCitas() {
    const citas = JSON.parse(localStorage.getItem("citas")) || [];
    const citasBody = document.getElementById("citas-body");
    citasBody.innerHTML = "";

    if (citas.length === 0) {
        citasBody.innerHTML = "<tr><td colspan='8'>Dato vacío</td></tr>";
        return;
    }

    citas.forEach((cita, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${cita.fecha}</td>
            <td>${cita.nombre}</td>
            <td>${cita.apellido}</td>
            <td>${cita.dni}</td>
            <td>${cita.telefono}</td>
            <td>${cita.observaciones}</td>
            <td>
                <button onclick="eliminarCita(${cita.id})">Eliminar</button>
                <button onclick="cargarCita(${cita.id})">Modificar</button>
            </td>
        `;
        citasBody.appendChild(fila);
    });
}

function eliminarCita(id) {
    let citas = JSON.parse(localStorage.getItem("citas")) || [];
    citas = citas.filter(cita => cita.id !== id);
    localStorage.setItem("citas", JSON.stringify(citas));
    mostrarCitas();
}

function cargarCita(id) {
    const citas = JSON.parse(localStorage.getItem("citas")) || [];
    const cita = citas.find(cita => cita.id === id);
    if (cita) {
        document.getElementById("fecha").value = cita.fecha;
        document.getElementById("nombre").value = cita.nombre;
        document.getElementById("apellido").value = cita.apellido;
        document.getElementById("dni").value = cita.dni;
        document.getElementById("telefono").value = cita.telefono;
        document.getElementById("fechaNacimiento").value = cita.fechaNacimiento;
        document.getElementById("observaciones").value = cita.observaciones;
    }
}

document.addEventListener("DOMContentLoaded", mostrarCitas);
