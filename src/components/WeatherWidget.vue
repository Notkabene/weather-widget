<template>
  <div class="weather-widget">
    <template v-if="isFrontVisible && countriesList?.length">
      <WeatherWidgetFront v-for="item in countriesList" :key="item.id" :item="item" class="widget-front" @toggleVisible="toggleVisibleFront" />
    </template>
    <WeatherWidgetSettings v-else class="widget-settings" @toggleVisible="toggleVisibleFront" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// eslint-disable-next-line import/extensions
import { countriesList } from '@/components/vars';
import WeatherWidgetFront from '@/components/WeatherWidgetFront.vue';
import WeatherWidgetSettings from '@/components/WeatherWidgetSettings.vue';

const isFrontVisible = ref<boolean>(true);
const countriesListLocal = localStorage.getItem('countriesList');

if(countriesListLocal) {
  countriesList.value = JSON.parse(countriesListLocal);
}
if(!countriesList.value.length)
  isFrontVisible.value = false;

function toggleVisibleFront() {
  isFrontVisible.value = !isFrontVisible.value;
}
</script>

<style lang="scss">
@import '@/assets/styles/main';
@import './weatherWidget';
</style>
