<template>
  <ul class="widget-front">
    <li class="widget-front__item">
      <div class="widget-front__top">
        <p :class="['widget-front__top-city', {skeleton: showLoader}]">
          {{ weatherInfo?.city }}, {{ weatherInfo?.country }}
        </p>
        <button type="button" class="widget-front__top-btn" @click="toggleVisible">
          <img class="widget-front__data-icon" src="@/assets/img/settings.svg" />
        </button>
      </div>
      <div class="widget-front__preview">
        <img class="widget-front__preview-img" src="@/assets/img/cloudy-day-1.svg" alt="" />
        <ul class="widget-front__data">
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="@/assets/img/temperature.svg" />
            <span>{{ Math.round(weatherInfo?.temperature) }}° С</span>
          </li>
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="@/assets/img/wind-white.svg" />
            <span>{{ weatherInfo?.wind }} m/s</span>
          </li>
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="@/assets/img/pressure.svg" />
            <span>{{ weatherInfo?.pressure }} hPa</span>
          </li>
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="@/assets/img/moisture-white.svg" />
            <span>{{ weatherInfo?.moisture }}%</span>
          </li>
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="@/assets/img/dew.svg" />
            <span>{{ Math.round(weatherInfo?.dew) }}° С</span>
          </li>
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="@/assets/img/visibility.svg" />
            <span>{{ numberWithSpaces(weatherInfo?.visibility) }} km</span>
          </li>
        </ul>
      </div>
      <div class="widget-front__info">
        <span>Feels like -3град С</span>
        <span>Broken Clouds</span>
        <span>Light Breeze</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
// eslint-disable-next-line import/extensions
import { GEOLOCATION_API, WEATHER_API_KEY, WEATHER_API } from '@/constants';
// eslint-disable-next-line import/extensions
import { weatherInfoInterface, responseGeo, responseWeather, countryInterface } from '@/interfaces';

const props = defineProps({
  item: {
    type: Object as PropType<countryInterface>,
    required: true,
  },
});

const emit = defineEmits(['toggleVisible']);
const lat = ref<number>();
const lon = ref<number>();
const showLoader = ref<boolean>(true);

const weatherInfo = ref<weatherInfoInterface>({
  temperature: 0,
  wind: 0,
  pressure: 0,
  moisture: 0,
  dew: 0,
  visibility: 0,
  city: '',
  country: '',
});

interface responseGeo {
  name: string;
  'local_names': { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state: string;
}

async function getData() {
  // await getGeolocation();
  await fetch(`${WEATHER_API}lat=${lat.value}&lon=${lon.value}&lang=ru&appid=${WEATHER_API_KEY}&units=metric`)
      .then(res => res.json())
      .then((res: responseWeather) => {
        weatherInfo.value.temperature = res.main.temp;
        weatherInfo.value.wind = res.wind.speed;
        weatherInfo.value.pressure = res.main.pressure;
        weatherInfo.value.moisture = res.clouds.all;
        weatherInfo.value.dew = res.main.humidity;
        weatherInfo.value.visibility = res.visibility;
        weatherInfo.value.city = res.name;
        weatherInfo.value.country = res.sys.country;
      });
      showLoader.value = false;
}

getData();

function numberWithSpaces(number: number) {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

function toggleVisible() {
  emit('toggleVisible');
}

</script>

<style scoped lang="scss">
@import './weatherWidgetFront';
</style>
