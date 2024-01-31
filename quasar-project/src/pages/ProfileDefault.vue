<template>
  <div class="mainContainer">
    <div v-if="!loading">
      <template v-for="ticket in userTickets.tickets.tickets" :key="ticket">
        <q-card class="text-white q-mt-md" style="background: black">
          <q-card-section>
            <div class="text-h5">Билет №{{ ticket.uId }}</div>
            <div class="text-subtitle1">Отправление: {{ ticket.from }}</div>
            <div class="text-subtitle1">Прибытие: {{ ticket.to }}</div>
            <div class="text-subtitle1">Место: {{ ticket.place }}</div>
            <div class="text-subtitle1">Дата: {{ ticket.time }}</div>
          </q-card-section>

          <q-card-section>
            <div class="text-h5">Информация пассажира</div>
            <div class="text-subtitle1">
              ФИО: {{ ticket.firstName }} {{ ticket.surname }}
              {{ ticket.lastName }}
            </div>
            {{ ticket.documnet }}: {{ ticket.serial }} {{ ticket.numberSerial }}
            <div class="text-subtitle1">
              Email: {{ ticket.email }}
            </div>
            <div class="text-subtitle1">Телефон: {{ ticket.phone }}</div>
          </q-card-section>
        </q-card>
      </template>
    </div>
    <div v-else style="background-color: aqua; height: 100%; width: 100%">
      Пусто
    </div>
  </div>
</template>

<script setup lang="ts">
import ContainerDefault from "src/components/ContainerDefault.vue";
import { useUserStore } from "src/stores/user";
import { ref, onMounted, onUnmounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
const userTickets = useUserStore();
const tickets = ref(userTickets.tickets);
const ticketsCount = ref();
const loading = ref(true);
async function getTickets() {
  $q.loading.show({
    message: "Загрузка информации о билетах...",
  });
  await userTickets.getUserTicketsFromStore(userTickets.email);
  $q.loading.hide();
  loading.value = false;
}
onMounted(() => {
  getTickets();
});
onUnmounted(() => {
  userTickets.tickets = [];
});
</script>

<style scoped lang="scss">
.mainContainer {
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: auto;
  padding: 15px;
  display: flex;
  margin: 0 auto;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 960px) {
    flex-wrap: wrap;
    width: auto;
    height: auto;
  }
}
</style>
