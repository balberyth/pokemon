<template>
  <div class="full-screen" id="cosomain">
    <!-- Contenido de tu página aquí -->
    <div class="container-fluid mt-4" id="pokemon-info" v-if="pokemon">
      <div class="row align-items-center">
        <div class="col-md-4">
          <div>
            <img
              :src="pokemon.sprites.front_default"
              alt="Imagen del Pokémon"
              class="img-fluid"
              id="imagen"
            />
          </div>
        </div>
        <div class="col-md-8">
          <h1>{{ pokemon.name }}</h1>
          <p>Número: {{ pokemon.id }}</p>
          <p>Altura: {{ pokemon.height }}</p>
          <p>Peso: {{ pokemon.weight }}</p>
          <button class="btn btn-info" @click="mostrarEstadisticas">
            Estadísticas
          </button>
          <div v-if="mostrarStats" class="stats-container">
            <h3>Estadísticas</h3>
            <ul>
              <li v-for="(stat, index) in pokemon.stats" :key="index">
                {{ stat.stat.name }}:
                <div class="stat-info">
                  <div
                    :class="'stat-progress ' + getStatClass(stat.stat.name)"
                    id="barrasP"
                  >
                    <div
                      class="progress-bar"
                      :style="{ width: stat.base_stat + '%' }"
                    ></div>
                  </div>
                  <span class="stat-value">{{ stat.base_stat }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-outline-success traer-btn" @click="traer()">
        Traer datos
      </button>
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
    let r = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`
    );
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
  width: 100%;
}

/* Estilos base */
#pokemon-info {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrar horizontalmente */
}

#pokemon-info .container {
  width: 100%;
}

#pokemon-info h1 {
  color: #007bff;
  font-size: 24px;
  margin-bottom: 10px;
}

#pokemon-info p {
  font-size: 16px;
  margin-bottom: 5px;
}

#pokemon-info button {
  background-color: #17a2b8;
  border: none;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

#pokemon-info button:hover {
  background-color: #138496;
}

#pokemon-info .stats-container {
  margin-top: 15px;
}

#pokemon-info .stats-container h3 {
  color: #007bff;
  font-size: 20px;
  margin-bottom: 10px;
}

#pokemon-info .stats-container ul {
  list-style: none;
  padding: 0;
}

#pokemon-info .stats-container li {
  font-size: 16px;
  margin-bottom: 5px;
}

.stat-progress {
  width: 100%;
  height: 10px;
  border-radius: 5px;
  margin: 5px 0; /* Ajusta los márgenes */
}

.progress-bar {
  height: 100%;
  border-radius: 5px;
}

/* Estilos específicos para cada tipo de estadística */
.stat-progress.hp .progress-bar {
  background-color: #ff5959;
}

.stat-progress.attack .progress-bar,
.stat-progress.special-attack .progress-bar {
  background-color: #ffac59;
}

.stat-progress.defense .progress-bar,
.stat-progress.special-defense .progress-bar {
  background-color: #59a9ff;
}

.stat-progress.speed .progress-bar {
  background-color: #59ffac;
}

.full-screen {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.container-fluid {
  flex: 1;
  padding: 0;
  max-width: 800px; /* Cambia este valor según sea necesario */
  width: 100%;
}

#barrasP {
  display: flex;
  justify-content: center;
  width: 100%;
}

#barrasP .stat-progress {
  margin: 10px 0; /* Ajusta los márgenes */
}

#imagen {
  width: 700px;
  height: auto;
}
.btn-outline-success {
    position: absolute;
  bottom: 50px; /* ajusta este valor según sea necesario */
  left: 50%;
  transform: translateX(-50%);
  margin-top: auto;
}

/* Media query para pantallas más pequeñas */
@media screen and (max-width: 768px) {
  #pokemon-info {
    padding: 10px; /* Reduce el relleno */
    margin-top: 10px; /* Reduce el margen superior */
  }

  #pokemon-info h1 {
    font-size: 20px; /* Reduce el tamaño del título */
  }

  #pokemon-info p {
    font-size: 14px; /* Reduce el tamaño del texto */
  }

  #pokemon-info button {
    padding: 6px 12px; /* Reduce el tamaño del botón */
    font-size: 14px; /* Reduce el tamaño del texto del botón */
  }

  .traer-btn {
    display: block;
    margin: 20px auto;
  }
}

@media screen and (max-width: 768px) {
  #pokemon-info {
    flex-direction: column;
  }

  .traer-btn {
    position: static;
    margin-top: 20px;
  }
}

</style>
