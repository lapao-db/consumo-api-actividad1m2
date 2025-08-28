//URL 
const API_URL = 'https://ghibliapi.dev/films';
let perfilVisible = false;
let todasPeliculas = []; //Guarda todas las peliculas


// OBTENER INFORMACION PERFIL
const cargarInformacion = async() => {
    
    try {
    const respuesta = await fetch("./persona.json");
    const persona = await respuesta.json();
    console.log("persona obetida", persona);
    mostrarInfor(persona);
    } catch (error) {
        console.error("Hubo un error inesperado: ", error);
        alert ("Hubo un error inesperado, intente más tarde")
    }
} 

//MOSTRAR PERFIL
const mostrarInfor = (persona) => {
    console.log("Vamos a construir un html");
    const contenedor = document.getElementById("datos");

    contenedor.innerHTML = `

            <h2 class="miNomnre">${persona.nombre}</h2>
            <p class="miPais">Pais: ${persona.direccion.pais} </p>
            <p class="miCiudad">Ciudad: ${persona.direccion.ciudad} </p>
            <div class="misHobbies">
                <h3>Hobbies</h3>
                <ul>
                    <li>Hobbie 1: ${persona.hobbies[0]}</li>
                    <li>Hobbie 2:${persona.hobbies[1]}</li>
                    <li>Hobbie 3:${persona.hobbies[2]}</li>
                </ul>
            </div>
       `
}

//CARGAR API GIBLI
const cargarApi = async() => {

    try {
        const respuesta = await fetch(API_URL);
        todasPeliculas = await respuesta.json();
        console.log("Peliculas Obtenidas", todasPeliculas);
        mostrarPelis(todasPeliculas);
        
    } catch (error) {
        console.error("Hubo un error inesperado: ", error);
        alert ("Hubo un error inesperado, intente más tarde") 
    }
}

// TARJETAS HTML DE PELICULAS

function mostrarPelis(movies){
const resultsContainer = document.getElementById('resultsInfo');
    
    if (!movies || movies.length === 0) {
        resultsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    <h5>🔍 No se encontraron películas</h5>
                    <p>Intenta con otro filtro o búsqueda</p>
                </div>
            </div>
        `;
        return;
    }
    const moviesHTML= movies.map(movie => {
        // Variables simples para los datos
        const title = movie.title || 'Sin título';
        const year = movie.release_date || 'N/A';
        const director = movie.director || 'Desconocido';
        const image = movie.image || 'https://via.placeholder.com/300x400';
        const description = movie.description || 'Sin descripción';
        
        return `
            <div class="col-lg-4 col-md-6">
                <div class="card mb-3">
                    <img src="${image}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="text-muted">Director: ${director}</p>
                        <p class="text-muted">Año: ${year}</p>
                        <p class="card-text">${description.substring(0, 100)}...</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
   

    resultsContainer.innerHTML = moviesHTML;
}



// BUSQUEDA INPUT TEXTO
    const buscarPeliculas = async()=> {
            const txtIngresado = document.getElementById('buscarInput').value.trim().toLowerCase();
            
            if (!txtIngresado) {
                alert('Por favor, ingresa el nombre de una película');
                return;
            }

            //showLoading();
            
            if (todasPeliculas.length === 0) {
                await cargarApi();
            }

            const filtroPeli = todasPeliculas.filter(movie => 
                movie.title.toLowerCase().includes(txtIngresado) ||
                movie.original_title.toLowerCase().includes(txtIngresado) ||
                movie.description.toLowerCase().includes(txtIngresado)
            );

            mostrarPelis(filtroPeli);
            //hideLoading();
        }