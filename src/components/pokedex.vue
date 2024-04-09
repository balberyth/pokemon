<template>
    <div class="full-screen" id="cosomain">
        <!-- Contenido de tu página aquí -->
        <div class="container-fluid mt-4" id="pokemon-info" v-if="pokemon">
            <div class="row">
                <div class="col">
                    <div>
                        <img :src="pokemon.sprites.front_default" alt="Imagen del Pokémon" class="img-fluid" id="imagen" />
                    </div>
                    <!-- Aquí va tu contenido -->
                    <h1>{{ pokemon.name }}</h1>
                    <p>Número: {{ pokemon.id }}</p>
                    <p>Altura: {{ pokemon.height }}</p>
                    <p>Peso: {{ pokemon.weight }}</p>
                    <button class="btn btn-info" @click="mostrarEstadisticas">Estadísticas</button>
                    <div v-if="mostrarStats" class="stats-container">
                        <h3>Estadísticas</h3>
                        <ul>
                            <li v-for="(stat, index) in pokemon.stats" :key="index">
                                {{ stat.stat.name }}:
                                <div class="stat-info">
                                    <div :class="'stat-progress ' + getStatClass(stat.stat.name)" id="barrasP">
                                        <div class="progress-bar" :style="{ width: stat.base_stat + '%' }"></div>
                                    </div>
                                    <span class="stat-value">{{ stat.base_stat }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn btn-outline-success"  @click="traer()"> Traer datos </button>
       
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
#cosomain {
    height: 100%;
}

/* Estilos para los datos del Pokémon */
#pokemon-info {
    background-color: #f8f9fa;
    /* Color de fondo */
    border: 1px solid #ced4da;
    /* Borde */
    border-radius: 5px;
    /* Borde redondeado */
    padding: 15px;
    /* Espaciado interno */
    margin-top: 20px;
    /* Margen superior */
}

#pokemon-info h1 {
    color: #007bff;
    /* Color del título */
    font-size: 24px;
    /* Tamaño del título */
    margin-bottom: 10px;
    /* Margen inferior */
}

#pokemon-info p {
    font-size: 16px;
    /* Tamaño del texto */
    margin-bottom: 5px;
    /* Margen inferior */
}

#pokemon-info button {
    background-color: #17a2b8;
    /* Color de fondo del botón */
    border: none;
    /* Quitar borde */
    color: #fff;
    /* Color del texto */
    padding: 8px 16px;
    /* Espaciado interno */
    font-size: 16px;
    /* Tamaño del texto */
    border-radius: 5px;
    /* Borde redondeado */
    cursor: pointer;
    /* Cambiar cursor al pasar por encima */
    margin-top: 10px;
    /* Margen superior */
}

#pokemon-info button:hover {
    background-color: #138496;
    /* Cambiar color de fondo al pasar por encima */
}

#pokemon-info .stats-container {
    margin-top: 15px;
    /* Margen superior */
}

#pokemon-info .stats-container h3 {
    color: #007bff;
    /* Color del título */
    font-size: 20px;
    /* Tamaño del título */
    margin-bottom: 10px;
    /* Margen inferior */
}

#pokemon-info .stats-container ul {
    list-style: none;
    /* Quitar viñetas de la lista */
    padding: 0;
    /* Quitar espaciado interno */
}

#pokemon-info .stats-container li {
    font-size: 16px;
    /* Tamaño del texto */
    margin-bottom: 5px;
    /* Margen inferior */
}

.stat-progress {
    width: 100px;
    /* Ancho de la barra de progreso */
    height: 10px;
    /* Altura de la barra de progreso */
    border-radius: 5px;
    /* Borde redondeado de la barra de progreso */
}

.progress-bar {
    height: 100%;
    /* Altura completa de la barra de progreso */
    border-radius: 5px;
    /* Borde redondeado de la barra de progreso */
}

/* Estilos específicos para cada tipo de estadística */
.stat-progress.hp .progress-bar {
    background-color: #ff5959;
    /* Color de la barra de progreso para HP */
}

.stat-progress.attack .progress-bar,
.stat-progress.special-attack .progress-bar {
    background-color: #ffac59;
    /* Color de la barra de progreso para ataque y special attack */
}

.stat-progress.defense .progress-bar,
.stat-progress.special-defense .progress-bar {
    background-color: #59a9ff;
    /* Color de la barra de progreso para defensa y special defense */
}

.stat-progress.speed .progress-bar {
    background-color: #59ffac;
    /* Color de la barra de progreso para velocidad */
}

.full-screen {
    min-height: 100vh;
    /* Establecer una altura mínima del 100% del viewport */
    display: flex;
    /* Usar flexbox para alinear verticalmente los elementos */
    justify-content: center;
    /* Centrar horizontalmente */
    align-items: center;
    /* Centrar verticalmente */
    width: 100%;
}

.container-fluid {
    flex: 1;
    /* Hacer que el contenido principal ocupe todo el espacio disponible */
    padding: 0;
    /* Quitar el relleno predeterminado */
    width: 100rem;
}

#barrasP {
    display: flex;
    justify-content: center;
    width: 100%;
}
#barrasP .stat-progress {
    margin: 20px auto; /* Ajusta los márgenes a 10px arriba y abajo, y "auto" para los laterales para centrar horizontalmente */
}
#imagen {
    width: 200px; /* Cambia el valor según sea necesario */
    height: auto; /* Esto asegura que la altura se ajuste automáticamente para mantener la proporción de la imagen */
}
</style>
