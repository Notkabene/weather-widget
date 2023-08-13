<template>
  <div class="widget-settings">
    <div class="widget-settings__top">
      <span>Настройки</span>
      <button type="button" class="widget-settings__close" @click="toggleVisible" />
    </div>
    <ul class="widget-settings__cities">
      <template v-if="countriesList">
        <li v-for="item in countriesList" :key="item.id" class="widget-settings__city">
          <button type="button" class="widget-settings__move">
            <img src="@/assets/img/move.svg" alt="двигать" />
          </button>
          <span>{{ item.city }}, {{ item.country }}</span>
          <button type="button" class="widget-settings__delete">
            <img src="@/assets/img/delete.svg" alt="удалить" />
          </button>
        </li>
      </template>
      <li v-else class="widget-settings__empty">
        <img src="@/assets/img/add.svg" />
        <span>Вы еще не выбрали города для отображения</span>
      </li>
    </ul>
    <form class="widget-settings__form" @submit.prevent="getGeolocation">
      <label class="widget-settings__label" for="">Добавить город</label>
      <input v-model="inputValue" class="widget-settings__input" type="text" required />
      <button type="submit" class="widget-settings__submit">
        Найти город
      </button>
    </form>
    <ul class="widget-settings__add-list">
      <li class="widget-settings__add-item" v-for="city in newCities" :key="city">
        <button @click="addLocation(city)">
          <img class="widget-settings__add-icon" src="@/assets/img/add.svg" />
        </button>
        <span>{{city.city}}, {{city.country}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
// eslint-disable-next-line import/extensions
import { countriesList } from '@/components/vars';
import { ref } from 'vue';
// eslint-disable-next-line import/extensions
import { GEOLOCATION_API, WEATHER_API_KEY } from '@/constants';
// eslint-disable-next-line import/extensions
import { countryInterface, responseGeo } from '@/interfaces';

const emit = defineEmits(['toggleVisible']);
const newCities = ref<countryInterface[]>([]);
const inputValue = ref<string>('');
async function getGeolocation() {
  await fetch(`${GEOLOCATION_API}q=${inputValue.value}&limit=10&appid=${WEATHER_API_KEY}`)
      .then(res => res.json())
      .then((res: responseGeo[]) => {
        // newCities.value = [...res];
        newCities.value = [];
        res.forEach(item => {
          const newItem = {
            city: item.local_names?.ru ?? item.name,
            country: item.country,
            lat: item.lat,
            lon: item.lon,
            id: `${item.name}${item.lat}`,
          };
          newCities.value.push(newItem);
        });
      });
}

function addLocation(newCity: countryInterface) {
  countriesList.value?.push(newCity);
}

function toggleVisible() {
  emit('toggleVisible');
}
</script>

<style scoped lang="scss">
@import './weatherWidgetSettings';
</style>
