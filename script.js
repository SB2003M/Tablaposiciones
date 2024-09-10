document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            const renderTable = () => {
                data.sort((a, b) => b.pts - a.pts);

                const tableBody = document.querySelector('#positions-table tbody');
                tableBody.innerHTML = ''; 

        
                data.forEach((item, index) => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${index + 1}</td> 
                        <td>${item.equipo}</td> 
                        <td>${item.pts}</td> 
                        <td>${item.pj}</td>
                        <td>${item.g}</td> 
                        <td>${item.e}</td> 
                        <td>${item.p}</td> 
                        <td>${item.gf}</td> 
                        <td>${item.gc}</td> 
                        <td>${item.dg}</td> 
                        <td>
                            <button class="edit-btn" data-index="${index}">Editar</button>
                        </td> 
                    `;

                    tableBody.appendChild(row);
                });

                document.querySelectorAll('.edit-btn').forEach(button => {
                    button.addEventListener('click', handleEdit);
                });
            };
            const handleEdit = (event) => {
                const index = event.target.dataset.index;
                const item = data[index];

                const nuevoPts = prompt('Ingresa nuevos puntos:', item.pts);
                const nuevoPj = prompt('Ingresa nuevos partidos jugados:', item.pj);
                const nuevoG = prompt('Ingresa nuevos partidos ganados:', item.g);
                const nuevoE = prompt('Ingresa nuevos empates:', item.e);
                const nuevoP = prompt('Ingresa nuevos partidos perdidos:', item.p);
                const nuevoGf = prompt('Ingresa nuevos goles a favor:', item.gf);
                const nuevoGc = prompt('Ingresa nuevos goles en contra:', item.gc);
                const nuevoDg = prompt('Ingresa nueva diferencia de goles:', item.dg);

                item.pts = parseInt(nuevoPts);
                item.pj = parseInt(nuevoPj);
                item.g = parseInt(nuevoG);
                item.e = parseInt(nuevoE);
                item.p = parseInt(nuevoP);
                item.gf = parseInt(nuevoGf);
                item.gc = parseInt(nuevoGc);
                item.dg = parseInt(nuevoDg);
    
                renderTable();
            };

            renderTable();
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});
