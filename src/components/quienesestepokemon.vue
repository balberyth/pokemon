<template>
	<div class="pokemon-game-container" :style="cosoMargen()">
		<div class="pokemon-game">
			<h1 class="game-title">¿Quién es ese Pokémon?</h1>
			<img :src="currentPokemon.image" alt="Pokemon" class="pokemon-image" />
			<input type="text" v-model="guess" placeholder="¿Quién es este Pokémon?" class="pokemon-input" />
			<button @click="checkGuess" class="pokemon-button">Adivinar</button>
			<button @click="showPokemonData" class="pokemon-button">Mostrar Datos del Pokémon</button>
			<p v-if="showResult" class="result-message">{{ resultMessage }}</p>
			<div v-if="guessedCorrectly" class="pokemon-data">
				<p>
					<strong class="data-label">Nombre:</strong> <span class="data-value">{{ currentPokemon.name }}</span>
				</p>
				<p>
					<strong class="data-label">Altura:</strong> <span class="data-value">{{ currentPokemon.height }}</span>
				</p>
				<p>
					<strong class="data-label">Peso:</strong> <span class="data-value">{{ currentPokemon.weight }}</span>
				</p>
				<p>
					<strong class="data-label">Tipos:</strong> <span class="data-value">{{ currentPokemon.types.join(", ") }}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentPokemon = ref({});
const guess = ref("");
const showResult = ref(false);
const resultMessage = ref("");
const guessedCorrectly = ref(false); // Nuevo ref para controlar si se ha adivinado correctamente
let cositas = ref(false);

const fetchPokemon = async () => {
	try {
		const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 898) + "/");
		const data = await response.json();
		currentPokemon.value = {
			name: data.name,
			image: data.sprites.front_default,
			height: data.height,
			weight: data.weight,
			types: data.types.map((type) => type.type.name),
		};
	} catch (error) {
		console.error("Error fetching Pokemon:", error);
	}
};

const checkGuess = () => {
	showResult.value = true;
	if (guess.value.toLowerCase() === currentPokemon.value.name.toLowerCase()) {
		resultMessage.value = "¡Correcto!";
		guessedCorrectly.value = true; // Establece a true si adivinó correctamente
		cositas.value = true;
	} else {
		resultMessage.value = "Incorrecto. Intenta de nuevo.";
	}
};

const showPokemonData = () => {
	console.log("Nombre:", currentPokemon.value.name);
	console.log("Altura:", currentPokemon.value.height);
	console.log("Peso:", currentPokemon.value.weight);
	console.log("Tipos:", currentPokemon.value.types);
};

onMounted(fetchPokemon);

function cosoMargen() {
	switch (cositas.value) {
		case false:
			return { marginTop: '70px', marginBottom: '50px'}
		case true:
			return { marginTop: '200px', marginBottom: '130px'}
		default:
			break;
	}
}
</script>

<style scoped>
.pokemon-game-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

.pokemon-game {
	text-align: center;
	background-color: #f0f0f0;
	padding: 50px;
	border-radius: 20px;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
	border: 2px solid black;
	max-width: 800px;
	width: 80%;
}

.game-title {
	color: #ff5f5f;
	font-size: 26px;
}

.pokemon-image {
	width: 200px;
	height: 200px;
	margin: 20px auto;
	display: block;
	border-radius: 50%;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
	border: 2px solid black;
}

.pokemon-input {
	padding: 6px;
	font-size: 20px;
	border: 3px solid #ffcb05;
	border-radius: 8px;
	margin-top: 15px;
	width: 100%;
	max-width: 500px;
}

.pokemon-button {
	margin: 10px 0 0 10px;
	padding: 9px 15px;
	background-color: #ffcb05;
	color: #333;
	font-size: 20px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.pokemon-button:hover {
	background-color: #ffc800;
}

.result-message {
	margin: 15px 0 0 0;
	font-size: 24px;
	color: #ff5f5f;
}

.pokemon-data {
	margin: 30px 0 0 0;
	font-size: 20px;
	text-align: left;
}

.data-label {
	color: #5f5fff;
}

.data-value {
	color: #5fff5f;
}
</style>
