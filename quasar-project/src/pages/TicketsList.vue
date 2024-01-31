<template>
  <ContainerDefault>
    <template v-if="!loading">
      <div>
        <h4>{{ paramsElements[0] }} - {{ paramsElements[1] }}</h4>
        <h5>git remote add origin https://github.com/Egor890/transportTransferByBus.git
          {{ dateString }}
        </h5>
      </div>
      <template v-if="tickets.tickets.length > 0">
        <template v-for="ticket in tickets.tickets[0].date_info" :key="ticket">
          <TicketForm
            :from="paramsElements[0]"
            :to="paramsElements[1]"
            :fromPlaceTime="
              ticket.timeFromTo
                .toDate()
                .toLocaleTimeString('ru-RU')
                .replace(/(.*)\D\d+/, '$1')
            "
            :toPlaceTime="
              addHoursToDate(ticket.timeFromTo.toDate(), 5)
                .toLocaleTimeString('ru-RU')
                .replace(/(.*)\D\d+/, '$1')
            "
            :price="tickets.tickets[0].price"
            :tickets="ticket.allPlaces"
            :freeTickets="ticket.freePlaces"
            :date="dateString"
            :dateToString="paramsElements[2]"
          />
        </template>
      </template>
      <template v-else>
        <h2>No Tickets</h2>
      </template>
    </template>
  </ContainerDefault>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "boot/firebase";
import { useQuasar } from "quasar";
import { ref, onMounted, onUnmounted, onUpdated, computed } from "vue";
import TicketForm from "src/components/TicketForm.vue";
import ContainerDefault from "src/components/ContainerDefault.vue";
import { useTicketsStore } from "src/stores/tickets";
const $q = useQuasar();
const tickets = useTicketsStore();
const route = useRoute();
const newNumber = route.params.id.toString();
const paramsElements = newNumber.split("_");
function addHoursToDate(date, hours) {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}
const tikcetsArray = ref([]);
async function setTickets() {

  const q = query(
    collection(db, "NewTickets"),
    where("from_place", "==", `${paramsElements[0]}`),
    where("to_place", "==", `${paramsElements[1]}`),
    where("time", "==", `${paramsElements[2]}`)
  );
  const DocID = `${paramsElements[0]}` + `_` + `${paramsElements[1]}`;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    tickets.docId = doc.id;
  });
  const sasa = onSnapshot(doc(db, "NewTickets", DocID), (doc) => {
    tikcetsArray.value = []
    console.log("Current data: ", doc.data());
    tikcetsArray.value.push(doc.data());
    tickets.tickets = tikcetsArray.value;
  });
  console.log(tikcetsArray.value);

}
onMounted(() => {

  getTicket();
});

// const unsub = onSnapshot(doc(db, "NewTickets", tickets.docId), (doc) => {
//   console.log("Current data: ", doc.data());
//   tickets.tickets.push(doc.data());
// });

onUnmounted(() => {
  tickets.tickets = [];
});

const date = new Date(paramsElements[2]);
const loading = ref(true);
const dateString = `${date.getDate()} ${date.toLocaleString("ru-RU", {
  month: "short",
})} ${date.getFullYear()}`;
console.log(new Date(paramsElements[2]));

async function getTicket() {
  $q.loading.show({
    message: "Загрузка информации о билетах...",
  });
  setTickets();
  // await tickets.setTicketsSearch(
  //   paramsElements[0],
  //   paramsElements[1],
  //   paramsElements[2]
  // );
  // const querySnapshot = await getDocs(q);
  // console.log(querySnapshot);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  //   const snapshot = doc.data();
  //   getPointFrom.value = snapshot;
  // });
  $q.loading.hide();
  loading.value = false;
}
console.log("The id is: " + paramsElements[0]);

// console.log(makeid(12));
</script>

<style module scoped></style>
