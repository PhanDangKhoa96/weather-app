<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import Weather from "../services/weather";

// data
const weather = ref({});
let search = ref("");
let history = reactive([]);
const date = computed(() => {
  const d = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let h = d.getHours().toString();
  h = ("0" + h).slice(-2);
  let m = d.getMinutes().toString();
  m = ("0" + m).slice(-2);
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear().toString().slice(-2);

  return `${h}:${m} - ${day}, ${date} ${month}'${year}`;
});

// Methods
const fetchData = async (value: string = "London") => {
  try {
    const { data } = await Weather.getWeather(value);
    weather.value = data;
    if (!history.find((h) => h.id === data.id)) {
      const his = {
        id: data.id,
        value: data.name,
      };
      history.push(his);
    }

    search.value = "";
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

const getImg = (name: string) => {
  return new URL(`../assets/images/${name}.png`, import.meta.url).href;
};

const deleteHistory = (index: number) => {
  history.splice(index, 1);
};

const targetHistory = (name: string) => {
  fetchData(name);
};

// On run
await fetchData();
</script>

<template>
  <main class="main relative text-white">
    <!-- BACK GROUND -->
    <div
      class="bg-image min-w-full min-h-screen bg-left bg-no-repeat bg-cover relative"
    >
      <div class="w-full h-full absolute backdrop-blur"></div>
    </div>
    <!-- CONTENT -->
    <div
      class="content w-[90%] h-[70vh] absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-inherit bg-no-repeat bg-cover grid grid-cols-[2fr_1fr] overflow-hidden"
    >
      <!-- LEFT CONTENT -->
      <div class="p-10 grid content-between">
        <h3>the.weather</h3>

        <div class="flex items-end gap-x-4">
          <span class="text-7xl font-medium">
            {{ Math.round(weather.main.temp - 273) }}º</span
          >

          <span>
            <h3 class="text-2xl font-medium">{{ weather.name }}</h3>
            <p>{{ date }}</p>
          </span>
          <span class="grid justify-items-center">
            <img :src="getImg(weather.weather[0].icon)" alt="" class="w-14" />
            <span>
              {{ weather.weather[0].main }}
            </span>
          </span>
        </div>
      </div>
      <!-- RIGHT CONTENT -->
      <div class="h-full backdrop-blur-2xl p-8 relative">
        <button
          class="z-10 cursor-pointer p-0 m-0 w-16 absolute right-0 top-0 bg-[#E28526] aspect-square text-xl"
          @click="fetchData(search)"
        >
          <i class="ri-search-line"></i>
        </button>
        <div
          class="h-2/4 border-b border-gray-400 py-6 relative overflow-auto pr-2"
        >
          <input
            @keydown.enter="fetchData(search)"
            v-model="search"
            type="text"
            placeholder="Add your city"
            class="bg-transparent border-b border-gray-400 text-gray-400 text-sm outline-none p-1 placeholder:text-gray-400 mb-3 w-3/4"
          />
          <div class="p-1">
            <div
              v-for="(his, index) in history"
              :key="his.id"
              class="text-gray-400 text-sm flex justify-between items-center py-1"
            >
              <span
                class="cursor-pointer hover:text-rose-700 transition-all"
                @click="targetHistory(his.value)"
                >{{ his.value }}</span
              >
              <span class="cursor-pointer" @click="deleteHistory(index)"
                ><i class="ri-close-line text-red-500"></i
              ></span>
            </div>
          </div>
        </div>
        <div
          class="h-2/4 border-b border-gray-400 py-6 grid items-center overflow-auto pr-2"
        >
          <h3 class="mb-4 font-semibold">Weather Details</h3>
          <div class="flex flex-col justify-between h-full">
            <p class="flex justify-between text-sm">
              <span class="text-gray-400">Cloud</span>
              <span>{{ weather.clouds.all }}%</span>
            </p>
            <p class="flex justify-between text-sm">
              <span class="text-gray-400">Humidity</span>
              <span>{{ weather.main.humidity }}%</span>
            </p>
            <p class="flex justify-between text-sm">
              <span class="text-gray-400">Wind</span>
              <span>{{ weather.wind.speed }} km/h</span>
            </p>
            <p class="flex justify-between text-sm">
              <span class="text-gray-400">Pressure</span>
              <span>{{ weather.main.pressure }} Pa</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 10px;
}

.bg-image,
.content {
  background-image: url(../assets/images/background.jpg);
}
</style>
