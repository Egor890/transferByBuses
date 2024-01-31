<style module>
.inputFromTo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.inputItem {
  font-size: 13px;
  margin-left: 5px;
  width: 130px;
  color: black;
}
</style>
<template>
  <ScaffoldCard title="Форма поиска билетов">
    <div class="q-pa-md" :class="$style.myform" style="max-width: 400px">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div :class="$style.inputFromTo">
          <q-input
            :class="$style.inputItem"
            label="Отправление"
            lazy-rules
            v-model="fromPlace"
            :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
          />
          <q-input
            :class="$style.inputItem"
            label="Прибытие"
            lazy-rules
            v-model="toPlace"
            :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
          />
        </div>
        <DatePicker @dateinput="handleDate($event)" title="Дата" />
        <div style="display: flex; align-items: center; justify-content: center;">
          <q-btn
          style="background: var(--q-primary); color: white; width: 200px;"
          label="Найти билеты"
          @click="onSubmit"
          type="submit"
        />
        </div>

      </q-form>
    </div>
  </ScaffoldCard>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import DatePicker from "src/components/DatePicker.vue";
import { useQuasar } from "quasar";
import ScaffoldCard from "src/components/ScaffoldCard.vue";
const $q = useQuasar();
function handleDate(getDate) {
  date.value = getDate;
}
const router = useRouter();
const fromPlace = ref("");
const date = ref(null);
const toPlace = ref("");
function onSubmit() {
  if (fromPlace.value && date.value && toPlace.value) {
    return router.push({
      name: "tickets",
      params: { id: fromPlace.value + "_" + toPlace.value + "_" + date.value },
    });
  } else {
    $q.notify({
      message: "Заполните все поля",
      color: "red",
    });
  }
}
</script>
