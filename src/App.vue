<script setup lang="ts">
import Weather from "./services/weather";
const fetchData = async () => {
  const { data } = await Weather.getWeather();
  console.log(data);
};
fetchData();
</script>

<template>
  <div class="text-3xl font-bold underline">Hello world</div>
</template>

<style></style>
