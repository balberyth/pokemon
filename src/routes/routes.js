import { createRouter, createWebHistory } from 'vue-router';
import pokedex from '../components/pokedex.vue';
import pokemonQuien from '../components/quienesestepokemon.vue'; // Suponiendo que tengas un archivo llamado "quien-es-este-pokemon.vue"

const routes = [
  { path: '/', component: pokedex },
  { path: '/pokemonQuien', component: pokemonQuien },
];


export const router = createRouter({
  history: createWebHistory(),

  routes,
});