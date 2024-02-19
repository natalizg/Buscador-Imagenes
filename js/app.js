const API_KEY = 'fXA5GFnyR7-dZSp8ANr0mdEJ08ONzj_Do-QlOdd5IAU';


window.addEventListener('load', function() {
    const formulario = document.getElementById('formulario');
    const inputTermino = document.getElementById('termino');
    const btnBuscar = document.getElementById('buscar');
    btnBuscar.addEventListener('click', (ev) => {
        const termino = inputTermino.value.trim();
        var pagina = 1;

        if(termino!==''){
            generarPagImagenes(termino, pagina);
        }else{
            validacionTermino();
        }
        ev.preventDefault();
    });
});


//funciones:

function generarPagImagenes(termino, pagina) {

    const contenedorResultado = document.getElementById("resultado");
    const contenedorPaginacion = document.getElementById("paginacion");
    let html = "";

    fetch(`https://api.unsplash.com/search/photos?page=${pagina}&query=${termino}&client_id=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < 10; i += 2) {

                // Obtener la URL de las imágenes
                const imageURL1 = data.results[i].urls.full;
                const imageLikes1 = data.results[i].likes;
                const imageURL2 = data.results[i + 1].urls.full;
                const imageLikes2 = data.results[i + 1].likes;

                // Generar el HTML para la fila de imágenes
                html += `
                    <div class="row flex justify-center">
                        <img src= "${imageURL1}" >
                        <img src= "${imageURL2}" >
                    </div>
                    <div class="container mx-auto mb-10 text-center flex justify-between" id="likes">
                        <button class="m-5 p-2 bg-blue-400 font-bold uppercase rounded"> Likes: ${imageLikes1} </button>
                        <button class="m-5 p-2 bg-blue-400 font-bold uppercase rounded"> Likes: ${imageLikes2} </button>
                    </div>
                `;
            }

            contenedorResultado.innerHTML = html;
            
            contenedorPaginacion.innerHTML = "";

            //botón retroceder:
            if (pagina > 1) {
                const botonRetroceder = document.createElement("button");
                botonRetroceder.className = "m-5 p-2 bg-yellow-400 cursor-pointer font-bold uppercase hover:bg-yellow-500 rounded";
                botonRetroceder.textContent = "← RETROCEDER";
                botonRetroceder.addEventListener("click", () => {
                    generarPagImagenes(termino, pagina - 1);
                });
                contenedorPaginacion.appendChild(botonRetroceder);
            }

            //boton adelantar:
            if (pagina != data.total_pages -1){
                const botonAvanzar = document.createElement("button");
                botonAvanzar.className = "m-5 p-2 bg-yellow-400 cursor-pointer font-bold uppercase hover:bg-yellow-500 rounded";
                botonAvanzar.textContent = "Avanzar → ";
                botonAvanzar.addEventListener("click", () => {
                    generarPagImagenes(termino, pagina + 1);
                });
                contenedorPaginacion.appendChild(botonAvanzar);
            }

        })
        
        .catch(error => console.error('Error fetching images:', error));


}

function validacionTermino() {
    const contenedorResultado = document.getElementById("resultado");
    const contenedorPaginacion = document.getElementById("paginacion");

    contenedorResultado.innerHTML = ""; // Borra todo el contenido previo
    contenedorPaginacion.innerHTML = "";
    const alerta = document.createElement("h2");
    alerta.className = "text-center text-3xl text-white my-10 font-bold mx-auto";
    alerta.textContent = "Por favor, introduzca una palabra en el buscador.";
    contenedorResultado.appendChild(alerta);
}
