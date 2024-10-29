// Selecciona los elementos del DOM
const form = document.getElementById('form');
const appointmentsList = document.getElementById('appointments-list');

// Maneja el evento de envío del formulario
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtén los valores de los campos
    const name = document.getElementById('name').value;
    const dni = document.getElementById('dni').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;

    // Verifica si los datos son válidos
    if (!validateForm(name, dni, phone, date)) return;

    // Crea un objeto de cita
    const appointment = {
        id: Date.now(),
        name,
        dni,
        phone,
        date,
        notes
    };

    // Añade la cita a la lista
    addAppointmentToTable(appointment);
});

// Función para validar el formulario
function validateForm(name, dni, phone, date) {
    // Ejemplo de validación básica: Verificar si el campo de teléfono tiene solo números
    if (isNaN(phone)) {
        alert("El teléfono debe ser un número");
        return false;
    }
    return true;
}

// Función para añadir la cita a la tabla
function addAppointmentToTable(appointment) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${document.querySelectorAll('#appointments-list tr').length + 1}</td>
        <td>${appointment.name}</td>
        <td>${appointment.dni}</td>
        <td>${appointment.phone}</td>
        <td>${appointment.date}</td>
        <td>${appointment.notes}</td>
        <td><button onclick="deleteAppointment(this)">Delete</button></td>
    `;

    appointmentsList.appendChild(row);
}

// Función para eliminar la cita
function deleteAppointment(button) {
    button.parentElement.parentElement.remove();
}
