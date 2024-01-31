<template>
<ContainerDefault>
  <ScaffoldCard title="Админка">
    <q-btn label="Добавить маршрут" to="/CreateRoute"/><br>
    <q-btn label="Все маршруты" @click="handleShowAll"/>
    <template v-if="showAll">
      <ul>
      <div v-for="ticket in ticketsInfo.tickets" :key="ticket">
        <li>{{ ticket }}</li>
      </div>
      </ul>
    </template>
  </ScaffoldCard>
</ContainerDefault>
</template>

<script setup lang="ts">
import { Timestamp } from "@firebase/firestore";
import { useTicketsStore } from "stores/tickets";
import { onMounted, ref, onUnmounted } from "vue";
import { useUserStore } from "src/stores/user";
import ContainerDefault from "src/components/ContainerDefault.vue";
import ScaffoldCard from "src/components/ScaffoldCard.vue";
const ticketsInfo = useTicketsStore()
const showAll = ref(false)
function handleShowAll() {
  ticketsInfo.setTicketsAll()
  showAll.value = !showAll.value
}
</script>

<style scoped></style>
