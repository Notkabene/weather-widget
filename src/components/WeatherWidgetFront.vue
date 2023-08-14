<template>
  <ul class="widget-front">
    <li class="widget-front__item">
      <div class="widget-front__top">
        <p :class="['widget-front__top-city', {skeleton: showLoader}]">
          {{ weatherInfo?.city }}, {{ weatherInfo?.country }}
        </p>
        <button type="button" class="widget-front__top-btn" @click="toggleVisible">
          <img class="widget-front__data-icon" src="../assets/img/icons/settings.svg" alt="настройки" />
        </button>
      </div>
      <div class="widget-front__preview">
        <img class="widget-front__preview-img" :src="getAsset(weatherInfo?.icon)" alt="иконка погоды" />
        <ul class="widget-front__data">
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="../assets/img/icons/temperature.svg" alt="температура" />
            <span>{{ Math.round(weatherInfo?.temperature) }}° С</span>
          </li>
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="../assets/img/icons/wind-white.svg" alt="ветер" />
            <span>{{ weatherInfo?.wind }} m/s</span>
          </li>
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="../assets/img/icons/pressure.svg" alt="давление" />
            <span>{{ weatherInfo?.pressure }} hPa</span>
          </li>
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="../assets/img/icons/moisture-white.svg" alt="влажность" />
            <span>{{ weatherInfo?.moisture }}%</span>
          </li>
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="../assets/img/icons/dew.svg" alt="роса" />
            <span>{{ Math.round(weatherInfo?.dew) }}° С</span>
          </li>
          <li :class="['widget-front__data-item', {skeleton: showLoader}]">
            <img class="widget-front__data-icon" src="../assets/img/icons/visibility.svg" alt="видимость" />
            <span>{{ numberWithSpaces(weatherInfo?.visibility) }} km</span>
          </li>
        </ul>
      </div>
      <div :class="['widget-front__info', {skeleton: showLoader}]">
        <span>Ощущается как {{ Math.round(weatherInfo?.feelsLike) }}° С. </span>
        <span>{{ weatherInfo?.description }}.</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
// eslint-disable-next-line import/extensions
import { WEATHER_API_KEY, WEATHER_API } from '@/constants';
// eslint-disable-next-line import/extensions
import { weatherInfoInterface, responseWeather, countryInterface } from '@/interfaces';

const props = defineProps({
  item: {
    type: Object as PropType<countryInterface>,
    required: true,
  },
});

const emit = defineEmits(['toggleVisible']);
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
  description: '',
  icon: '',
  feelsLike: 0,
});

async function getData() {
  await fetch(`${WEATHER_API}lat=${props.item.lat}&lon=${props.item.lon}&lang=ru&appid=${WEATHER_API_KEY}&units=metric`)
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
        weatherInfo.value.feelsLike = res.main.feels_like;
        weatherInfo.value.icon = res.weather[0].icon ?? 'all';
        weatherInfo.value.description = res.weather[0].description.charAt(0).toUpperCase() + res.weather[0].description.slice(1);
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

function getAsset (icon: string) {
  const iconsNames = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', 'all'];
  if(!icon)
    return require(`../assets/img/weathers/all.svg`);
  else if(iconsNames.includes(icon))
    return require(`../assets/img/weathers/${icon}.svg`);
  else
    return `https://openweathermap.org/img/wn/10d@${icon}.png`;
}

</script>

<style scoped lang="scss">
@import './weatherWidgetFront';
</style>
