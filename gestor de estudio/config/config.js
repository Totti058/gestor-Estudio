let notas = [];

const form = document.getElementById("formNotas");
const apuntesInput = document.getElementById("apuntes");
const materiaSelect = document.getElementById("materia");
const importanciaSelect = document.getElementById("importancia");
const tablaBody = document.querySelector("#tablaNotas tbody");

function generarId() {
    return Date.now() + Math.random();
}

function crearFila(item) {
    const fila = document.createElement("tr");
    fila.dataset.id = item.id;
    
    const tdNota = document.createElement("td");
    tdNota.textContent = item.nota;
    
    const tdMateria = document.createElement("td");
    tdMateria.textContent = item.materia;
    
    const tdImportancia = document.createElement("td");
    tdImportancia.textContent = item.importancia;
    
    const tdAccion = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn-eliminar";
    tdAccion.appendChild(btnEliminar);
    
    fila.append(tdNota, tdMateria, tdImportancia, tdAccion);
    return fila;
}

function guardarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));
}

function cargarNotas() {
    const data = localStorage.getItem("notas");
    if (data) {
        notas = JSON.parse(data);
        notas.forEach(item => {
            if (!item.id) item.id = generarId();
            tablaBody.appendChild(crearFila(item));
        });
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nota = apuntesInput.value.trim();
    
    if (nota === "") {
        alert("Escribe una nota antes de guardar.");
        return;
    }

    const nuevaNota = {
        id: generarId(),
        nota,
        materia: materiaSelect.value,
        importancia: importanciaSelect.value
    };

    notas.push(nuevaNota);
    guardarNotas();
    
    tablaBody.appendChild(crearFila(nuevaNota));
    form.reset();
});

tablaBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const fila = e.target.closest("tr");
        const id = parseFloat(fila.dataset.id);

        notas = notas.filter(item => item.id !== id);
        guardarNotas();
        fila.remove();
    }
});

window.addEventListener("DOMContentLoaded", cargarNotas);