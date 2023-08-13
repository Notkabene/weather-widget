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
// import { countryInterface } from '@/interfaces';
// eslint-disable-next-line import/extensions
import { countriesList } from '@/components/vars';
import WeatherWidgetFront from '@/components/WeatherWidgetFront.vue';
import WeatherWidgetSettings from '@/components/WeatherWidgetSettings.vue';

const isFrontVisible = ref<boolean>(true);

// countriesList.value = [
//   {id: 'knknj', city: 'London', country: 'GB'},
//   {id: 'dsfsggfh', city: 'Moscow', country: 'RU'},
// ];

function toggleVisibleFront() {
  isFrontVisible.value = !isFrontVisible.value;
}
</script>

<style lang="scss">
@import '@/assets/styles/main';
@import './weatherWidget';
</style>
