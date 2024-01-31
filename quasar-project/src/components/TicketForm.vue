<template>
  <div class="ticket">
    <div class="ticketHeader">
      <span class="itemForm">Отправление<br />{{ fromPlaceTime }}</span>
      <span class="itemForm">Прибытие<br />{{ toPlaceTime }}</span>
      <span class="itemForm"
        >Билетов<br />{{ freeTickets.length }}/{{ tickets.length }}</span
      >
      <span class="itemForm">Цена<br />{{ price }} руб.</span>
    </div>
    <span style="display: flex; margin: 5px auto; justify-content: center;">
      <q-btn
        align="around"
        label="Купить"
        icon="shopping_cart"
        :to="{
          name: 'TicketOrder',
          params: {
            info: `${from}_${to}_${date}_${fromPlaceTime}_${toPlaceTime}_${freeTickets}_${tickets}_${price}_${dateToString}_${tickets}`,
          },
        }"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  fromPlaceTime: {
    type: String,
    required: true,
  },
  toPlaceTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tickets: {
    type: Array,
    required: true,
  },
  freeTickets: {
    type: Array,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  dateToString: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.itemForm {
  font-size: 15px;
  margin-left: 5px;
  @media (max-width: 960px) {
    font-size: 12px;
  }
}

.ticket {
  border-radius: 8px;
}
/* .ticketHeader {
  height: auto;
  width: 800px;
  background-color: aquamarine;
  margin: 12px;

  @media (max-width: 960px) {
    background-color: brown;
    width: auto;
  }
} */
.ticket:hover {
  opacity: 1;
  transition: 0.3s linear;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
  cursor: pointer;
}
.ticketHeader {
  opacity: 0.8;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 21px;
  border-radius: 16px;
  background-color: white;
  border: none;
  margin-top: 10px;
  @media (max-width: 960px) {
    padding: 10px;
    width: auto;
  }
}
</style>
