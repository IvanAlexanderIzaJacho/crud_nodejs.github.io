document.addEventListener("DOMContentLoaded", function () {
  const employeeList = document.getElementById("employee-list");
  const clientForm = document.getElementById("client-form");

  // Función para cargar la lista de empleados desde la API
  async function loadEmployeeList() {
    try {
      const response = await fetch("/api/employees");
      const employees = await response.json();
      renderEmployeeList(employees);
    } catch (error) {
      console.error("Error al cargar la lista de empleados:", error);
    }
  }

  // Función para renderizar la lista de empleados en la tabla
  function renderEmployeeList(employees) {
    employeeList.innerHTML = "";
    employees.forEach(employee => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${employee.idCliente}</td>
        <td>${employee.dniCliente}</td>
        <td>${employee.apellidoCliente}</td>
        <td>${employee.nombreCliente}</td>
        <td>${employee.direccionCliente}</td>
        <td>${employee.edadCliente}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-btn" onclick="editEmployee(${employee.idCliente})">Editar</button>
          <button class="btn btn-danger btn-sm delete-btn" onclick="deleteEmployee(${employee.idCliente})">Eliminar</button>
        </td>
      `;
      employeeList.appendChild(row);
    });
  }

  // Función para editar un empleado
  window.editEmployee = function (employeeId) {
    // Redirige a la página de edición con el ID del empleado
    window.location.href = `/editarCliente.html?id=${employeeId}`;
  }; 

  // Función para eliminar un empleado
  window.deleteEmployee = async function (employeeId) {
    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: "DELETE"
      });

      if (response.status === 204) {
        // Empleado eliminado con éxito, recargar la lista
        loadEmployeeList();
      } else {
        console.error("Error al eliminar empleado:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
    }
  };
  // Función para mostrar mensajes de error personalizados
  function displayCustomErrors(errors) {
    for (const fieldName in errors) {
      const field = document.getElementById(fieldName);
      if (field) {
        field.classList.add("is-invalid");
        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains("invalid-feedback")) {
          feedback.textContent = errors[fieldName].message;
        }
      }
    }
  }

  // Limpiar mensajes de error al enfocar en un campo
  clientForm.addEventListener("focusin", function (event) {
    const field = event.target;
    if (field.classList.contains("is-invalid")) {
      field.classList.remove("is-invalid");
      const feedback = field.nextElementSibling;
      if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.textContent = "";
      }
    }
  });

  // Manejar el envío del formulario
  clientForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(clientForm);
    const requestData = {};
    formData.forEach((value, key) => {
      requestData[key] = value;
    });

    // Validar campos
    const isValid = validateFields(requestData);

    if (isValid) {
      try {
        const response = await fetch("/api/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        });

        if (response.ok) {
          // Empleado creado con éxito, recargar la lista
          loadEmployeeList();
          clientForm.reset(); // Limpiar el formulario después de enviar
        } else {
          // Mostrar mensajes de error personalizados
          const errorResponse = await response.json();
          displayCustomErrors(errorResponse.errors);
        }
      } catch (error) {
        console.error("Error al crear empleado:", error);
      }
    }
  });

  // Validar campos del formulario
  function validateFields(data) {
    let isValid = true;

    // Validar DNI (solo números)
    const dniRegex = /^[0-9]+$/;
    if (!dniRegex.test(data.dniCliente)) {
      isValid = false;
      displayValidationError("dniCliente", "Ingrese solo números para el DNI.");
    }

    // Validar Apellido y Nombre (solo letras)
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    if (!nameRegex.test(data.apellidoCliente)) {
      isValid = false;
      displayValidationError("apellidoCliente", "Ingrese solo letras y espacios en blanco.");
    }

    if (!nameRegex.test(data.nombreCliente)) {
      isValid = false;
      displayValidationError("nombreCliente", "Ingrese solo letras y espacios en blanco.");
    }

    // Validar Dirección (letras y números)
    const addressRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/;
    if (!addressRegex.test(data.direccionCliente)) {
      isValid = false;
      displayValidationError("direccionCliente", "Ingrese solo letras, números y espacios en blanco para la dirección.");
    }

    // Validar Edad (solo números)
    const ageRegex = /^[0-9]+$/;
    if (!ageRegex.test(data.edadCliente)) {
      isValid = false;
      displayValidationError("edadCliente", "Ingrese solo números para la edad.");
    }

    return isValid;
  }

  // Mostrar mensaje de error para un campo específico
  function displayValidationError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
      field.classList.add("is-invalid");
      const feedback = field.nextElementSibling;
      if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.textContent = message;
      }
    }
  }
  // Al cargar la página, cargar la lista de empleados
  loadEmployeeList();
});
