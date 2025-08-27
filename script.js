//URL 
const API_URL = 'https://ghibliapi.dev/films';
let perfilVisible = false;
let todasPeliculas = [];


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
        
    } catch (error) {
        console.error("Hubo un error inesperado: ", error);
        alert ("Hubo un error inesperado, intente más tarde") 
    }
}
