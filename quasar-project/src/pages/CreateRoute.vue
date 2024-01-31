<template>
  <ScaffoldCard title="Добавить маршрут">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div :class="$style.inputFromTo">
        <q-input
          filled
          :class="$style.inputItem"
          label="Отправление"
          lazy-rules
          v-model="fromPlace"
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
        <q-input
          filled
          :class="$style.inputItem"
          label="Прибытие"
          lazy-rules
          v-model="toPlace"
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
      </div>
      <div :class="$style.inputFromTo">
        <q-input
          filled
          :class="$style.inputItem"
          label="Цена"
          type="number"
          lazy-rules
          v-model="price"
          :rules="[(val) => (val > 0 && val.length > 0) || 'Заполните поле']"
        />
        <q-input
          filled
          :class="$style.inputItem"
          label="Количество мест"
          type="number"
          lazy-rules
          v-model="seats"
          :rules="[(val) => (val > 0 && val.length > 0) || 'Заполните поле']"
        />
      </div>
      <div style="max-width: 240px">
        <q-input filled v-model="timeFromTo">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="timeFromTo"
                  mask="YYYY-MM-DD HH:mm"
                  :locale="currentLocale"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="timeFromTo" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div style="display: flex; align-items: center; justify-content: center">
        <q-btn
          style="background: #00b3ff; color: white; width: 100%"
          label="Добавить маршрут"
          @click="onSubmit"
          type="submit"
        />
      </div>
    </q-form>
  </ScaffoldCard>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ContainerDefault from "src/components/ContainerDefault.vue";
import ScaffoldCard from "src/components/ScaffoldCard.vue";
import DatePicker from "src/components/DatePicker.vue";
import { useTicketsStore } from "stores/tickets";
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { Timestamp } from "@firebase/firestore";
const router = useRouter();
const $q = useQuasar();
const fromPlace = ref("");
const toPlace = ref("");
const timeFromTo = ref(new Date().toLocaleTimeString("ru-RU"));
const price = ref(null);
const seats = ref(25);
const NewRoute = useTicketsStore();
function onSubmit() {
  if (
    fromPlace.value &&
    toPlace.value &&
    price.value &&
    seats.value &&
    timeFromTo.value
  ) {
    const seatsFill = Array.from({ length: seats.value }, (_, i) => i + 1);
    const TimestampFormat = Timestamp.fromDate(new Date(timeFromTo.value));
    const searchTime = TimestampFormat.toDate().toLocaleDateString("ru-RU");
    console.log(
      fromPlace.value,
      toPlace.value,
      price.value,
      TimestampFormat,
      searchTime,
      seatsFill
    );

    NewRoute.addRoute(
      fromPlace.value,
      toPlace.value,
      Number(price.value),
      TimestampFormat,
      searchTime,
      seats.value
    );
    $q.notify({
      message: `Маршрут ${fromPlace.value} - ${toPlace.value} успешно добавлен`,
      color: "green",
    });
    return router.push({
      name: "Index",
    });
  } else {
    $q.notify({
      message: "Заполните все поля",
      color: "red",
    });
  }
}
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

<style module>
.inputFromTo {
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.inputItem {
  margin-left: 5px;
  width: 130px;
  color: black;
}
</style>
