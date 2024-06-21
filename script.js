document.addEventListener('DOMContentLoaded', function() {
    cargarTablaDesdeLocalStorage();
});

function cargarTablaDesdeLocalStorage() {
    const equipos = [
        "Cerámica", "Independiente", "22 de Octubre", "Varela", "Colón", 
        "Huracán", "Gimnasia", "11 Tigres", "Alsina", "Ciclón", 
        "Moquehua", "Villarino", "San Lorenzo", "La Candela", "Pellegrini"
    ];

    const tabla = document.getElementById('tabla-puntos');
    const tbody = tabla.querySelector('tbody');
    const datosGuardados = JSON.parse(localStorage.getItem('datosTabla')) || [];

    if (datosGuardados.length === equipos.length) {
        tbody.innerHTML = '';
        equipos.forEach((equipo, index) => {
            const posicion = index + 1;
            const fila = `
                <tr>
                    <td>${posicion}</td>
                    <td>${equipo}</td>
                    <td contenteditable="true">${datosGuardados[index].pj}</td>
                    <td contenteditable="true">${datosGuardados[index].pg}</td>
                    <td contenteditable="true">${datosGuardados[index].pe}</td>
                    <td contenteditable="true">${datosGuardados[index].pp}</td>
                    <td contenteditable="true">${datosGuardados[index].gf}</td>
                    <td contenteditable="true">${datosGuardados[index].gc}</td>
                    <td class="diferencia-goles">0</td>
                    <td class="puntos">0</td>
                </tr>
            `;
            tbody.innerHTML += fila;
            calcularDiferenciaGolesYPts(tbody.rows[index]);
        });

        ordenarTablaPorPuntos();
    } else {
        generarTablaEquipos();
    }

    tbody.addEventListener('input', function(event) {
        const fila = event.target.closest('tr');
        guardarCambiosLocalStorage(fila);
        calcularDiferenciaGolesYPts(fila);
        ordenarTablaPorPuntos();
    });
}

function generarTablaEquipos() {
    const equipos = [
        "Cerámica", "Independiente", "22 de Octubre", "Varela", "Colón", 
        "Huracán", "Gimnasia", "11 Tigres", "Alsina", "Ciclón", 
        "Moquehua", "Villarino", "San Lorenzo", "La Candela", "Pellegrini"
    ];

    const tabla = document.getElementById('tabla-puntos');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    equipos.forEach((equipo, index) => {
        const posicion = index + 1;
        const fila = `
            <tr>
                <td>${posicion}</td>
                <td>${equipo}</td>
                <td contenteditable="true">0</td>
                <td contenteditable="true">0</td>
                <td contenteditable="true">0</td>
                <td contenteditable="true">0</td>
                <td contenteditable="true">0</td>
                <td contenteditable="true">0</td>
                <td class="diferencia-goles">0</td>
                <td class="puntos">0</td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });

    ordenarTablaPorPuntos();
}

function guardarCambiosLocalStorage(fila) {
    const posicion = fila.querySelector('td:first-child').textContent;
    const equipo = fila.querySelector('td:nth-child(2)').textContent;
    const pj = fila.querySelector('td:nth-child(3)').textContent;
    const pg = fila.querySelector('td:nth-child(4)').textContent;
    const pe = fila.querySelector('td:nth-child(5)').textContent;
    const pp = fila.querySelector('td:nth-child(6)').textContent;
    const gf = fila.querySelector('td:nth-child(7)').textContent;
    const gc = fila.querySelector('td:nth-child(8)').textContent;

    const datosGuardados = JSON.parse(localStorage.getItem('datosTabla')) || [];
    datosGuardados[posicion - 1] = {
        equipo: equipo,
        pj: pj,
        pg: pg,
        pe: pe,
        pp: pp,
        gf: gf,
        gc: gc
    };
    localStorage.setItem('datosTabla', JSON.stringify(datosGuardados));
}

function calcularDiferenciaGolesYPts(fila) {
    const pj = parseInt(fila.cells[2].textContent);
    const pg = parseInt(fila.cells[3].textContent);
    const pe = parseInt(fila.cells[4].textContent);
    const pp = parseInt(fila.cells[5].textContent);
    const gf = parseInt(fila.cells[6].textContent);
    const gc = parseInt(fila.cells[7].textContent);

    const diferenciaGoles = gf - gc;
    const puntos = pg * 3 + pe;

    fila.cells[8].textContent = diferenciaGoles;
    fila.cells[9].textContent = puntos;
}

function ordenarTablaPorPuntos() {
    const tabla = document.getElementById('tabla-puntos');
    const tbody = tabla.querySelector('tbody');
    const filas = Array.from(tbody.querySelectorAll('tr'));

    filas.sort((filaA, filaB) => {
        const puntosA = parseInt(filaA.cells[9].textContent);
        const puntosB = parseInt(filaB.cells[9].textContent);
        if (puntosA !== puntosB) {
            return puntosB - puntosA;
        } else {
            const difGolesA = parseInt(filaA.cells[8].textContent);
            const difGolesB = parseInt(filaB.cells[8].textContent);
            return difGolesB - difGolesA;
        }
    });

    filas.forEach((fila, index) => {
        tbody.appendChild(fila);
        fila.cells[0].textContent = index + 1;
    });
}
