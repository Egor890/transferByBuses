<template>
  <div style="max-width: 180px" >
    <q-input v-model="date" :label="title" hint="Год/Месяц/День" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="date"
              :default-date="date"
              :locale="currentLocale"
              first-day-of-week="1"
              @click="$emit('dateinput', date)"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Закрыть" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const date = ref('');
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
const currentLocale = {
  days: "Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье".split(
    "_"
  ),
  daysShort: "Вс_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),
  months:
    "Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split(
      "_"
    ),
  monthsShort: "Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек".split("_"),
};
</script>

<style scoped></style>
