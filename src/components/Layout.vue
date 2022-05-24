<script setup lang="ts">
import { ref } from "vue";
import Weather from "../services/weather";

// data
const weather = ref({});

// Methods
const fetchData = async () => {
  const { data } = await Weather.getWeather("London");
  weather.value = data;
};

// On run
await fetchData();
</script>

<template>
  <main
    class="main bg-gradient-to-t from-blue-400 to-blue-100 min-w-full min-h-screen"
  ></main>
</template>

<style></style>
