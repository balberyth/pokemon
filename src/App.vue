<template>
    <div>
        <header class="bg-dark py-3">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-6">
                        <img src="./img/pokeapi_1024.png" alt="Logo" class="img-fluid" />
                    </div>
                    <div class="col-6 text-end">
                        <router-link to="/" class="btn btn-outline-success" @click="traer()"> Traer datos </router-link>
                        <router-link to="/pokemonQuien" class="btn btn-outline-success" @click="traer()"> Quien es este pokemon </router-link>
                    </div>
                </div>
            </div>
        </header>

        <!-- Contenido de tu página aquí -->
        <main>
            <router-view />
        </main>

        <footer class="bg-dark text-white py-3">
            <div class="container">
                <div class="row">
                    <div class="col text-center">
                        <p>© 2024 Tu Empresa. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

let pokemon = ref(null);
let mostrarStats = ref(false);

async function traer() {
    try {
        // Generar un número aleatorio entre 1 y 898 (total de Pokémon disponibles)
        const randomPokemonId = Math.floor(Math.random() * 898) + 1;
        let r = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
        pokemon.value = r.data;
        console.log(r.data);
    } catch (error) {
        console.log(error);
    }
}

function mostrarEstadisticas() {
    mostrarStats.value = !mostrarStats.value;
}

// Función para obtener la clase de una estadística
function getStatClass(statName) {
    const lowercaseName = statName.toLowerCase();
    if (lowercaseName === "attack") {
        return "attack";
    } else if (lowercaseName === "special-attack") {
        return "special-attack";
    } else if (lowercaseName === "defense") {
        return "defense";
    } else if (lowercaseName === "special-defense") {
        return "special-defense";
    } else {
        return lowercaseName;
    }
}
</script>

<style scoped>
main {
    height: 100vh;
}
/* Estilos para el header */
header {
    background-color: #343a40;
    /* Color de fondo del header */
    color: #fff;
    /* Color del texto */
    padding: 15px 0;
    /* Espaciado interno del header */
    width: 100%;
    /* Ancho del header al 100% de la pantalla */
    position: fixed;
    /* Fijar el header en la parte superior */
    top: 0;
    /* Distancia desde la parte superior */
    left: 0;
    /* Distancia desde la izquierda */
    z-index: 1000;
    /* Asegurar que el header esté encima de otros elementos */
}

header img {
    max-height: 70px;
    /* Altura máxima de la imagen del logo */
    width: 200px;
    display: inline-block;
    margin-bottom: 10px;
    justify-content: center;
}

/* Estilos para el footer */
footer {
    background-color: #343a40;
    color: #fff;
    padding: 15px 0;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    bottom: 0;
}
</style>
