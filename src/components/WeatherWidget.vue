<template>
  <div class="weather-widget">
    <template v-if="isFrontVisible && countriesList?.length">
      <WeatherWidgetFront v-for="item in countriesList" :key="item.id" :item="item" class="widget-front" @toggleVisible="toggleVisibleFront" />
    </template>
    <WeatherWidgetSettings
      v-else
      class="widget-settings"
      :userLocation="userLocation"
      @toggleVisible="toggleVisibleFront"
    />
  </div>
</template>

<script lang="ts" setup>
import { responseGeo } from '@/interfaces';
import { countriesList } from '@/components/vars';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { GEOLOCATION_API_LAT_LON, WEATHER_API_KEY } from '@/constants';
import WeatherWidgetFront from '@/components/WeatherWidgetFront.vue';
import WeatherWidgetSettings from '@/components/WeatherWidgetSettings.vue';

const watcher = ref<number>();
const isFrontVisible = ref<boolean>(true);
const userLocation = ref<responseGeo>();
const countriesListLocal = localStorage.getItem('countriesList');
const isSupported = 'navigator' in window && 'geolocation' in navigator;

function getUserLocation() {
  if (isSupported && !countriesList.value.length)
    watcher.value = navigator.geolocation.watchPosition(position => {
      fetch(`${GEOLOCATION_API_LAT_LON}lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=3&appid=${WEATHER_API_KEY}`)
          .then(res => res.json())
          .then((res: responseGeo[]) => {
            userLocation.value = res[0];
          });
    });
}
onMounted(() => {
  getUserLocation();
});

onUnmounted(() => {
  if (watcher.value)
    navigator.geolocation.clearWatch(watcher.value);
});

if(countriesListLocal) {
  countriesList.value = JSON.parse(countriesListLocal);
}

function toggleVisibleFront() {
  isFrontVisible.value = !isFrontVisible.value;
}

watch(countriesList, () => {
  if(!countriesList.value.length) {
    isFrontVisible.value = false;
    if(!userLocation.value)
      getUserLocation();
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/main';
@import './weatherWidget';
</style>
