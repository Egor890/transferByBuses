<template>
  <div class="mainContainer">
    <div class="formContainer">
      <div class="infoSection">
        <div class="infoSectionHeader">Информация о поездке</div>
        <div class="fromToContaier">
          <div>
            Отправление<br /><span style="opacity: 0.6"
              >{{ paramsElements[0] }} {{ paramsElements[3] }}</span
            >
          </div>
          <div style="">
            Прибытие<br /><span style="opacity: 0.6"
              >{{ paramsElements[1] }} {{ paramsElements[4] }}</span
            >
          </div>
        </div>
        <div
          style="margin: 20px auto; font-size: 40px; color: var(--q-primary)"
        >
          {{ paramsElements[7] }} руб.
        </div>
      </div>
    </div>
    <q-form @submit.prevent="onSubmit" class="myForm">
      <div class="headerInfo">
        Покупка билета на рейс<br />
        {{ paramsElements[0] }} — {{ paramsElements[1] }} на
        {{ paramsElements[2] }}
      </div>
      <div class="inputRow">
        <q-input
          v-model="firstName"
          label="Фамилия"
          class="inputField"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
        <q-input
          v-model="lastName"
          label="Имя"
          class="inputField"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
        <q-input
          v-model="surname"
          label="Отчество"
          class="inputField"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
      </div>

      <div class="inputRow">
        <q-select
          v-model="documnet"
          :options="typeOfDocument"
          label="Вид документа"
          class="inputField"
        />
        <q-input
          v-model="serial"
          label="Серия"
          class="inputField"
          mask="####"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
        <q-input
          v-model="numberSerial"
          label="Номер"
          class="inputField"
          mask="######"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
      </div>
      <div class="inputRow">
        <DatePicker @dateinput="handleDate($event)" title="Дата рождения" />
        <q-select
          v-model="place"
          :options="array"
          label="Место"
          style="width: 150px"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
      </div>
      <div class="inputRow">
        <q-input
          v-model="phone"
          label="Номер телефона"
          class="inputField"
          mask="+7(###)-###-##-##"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
        <q-input
          v-model="email"
          label="Email"
          class="inputField"
          type="email"
          lazy-rules
          :rules="[
            (val, rules) =>
              rules.email(val) || 'Please enter a valid email address',
          ]"
        />
      </div>
      <q-btn label="Оформить билет" @click="onSubmit" style="margin-top: 8px" type="submit"/>
    </q-form>
    <!-- <q-form @submit.prevent="onSubmit" class=" fixed-center">
      <q-input v-model="firstName" label="Фамилия" class="inputField" />
      <q-input v-model="lastName" label="Имя" class="inputField" />
      <q-input v-model="surname" label="Отчество" class="inputField" />
      <q-select v-model="place" :options="array" label="Место" />
      <q-select
        v-model="documnet"
        :options="typeOfDocument"
        label="Вид документа"
        class="inputField"
      />
      <q-input v-model="serial" label="Серия" class="inputField" mask="####" />
      <q-input
        v-model="numberSerial"
        label="Номер"
        class="inputField"
        mask="######"
      />

      <DatePicker @dateinput="handleDate($event)" title="Дата рождения" />
      <q-input
        v-model="phone"
        label="Номер телефона"
        class="inputField"
        mask="+7(###)-###-##-##"
      />
      <q-input v-model="email" label="Email" class="inputField" type="email" />
      <q-btn label="Оформить билет" @click="onSubmit" style="margin-top: 5px" />
    </q-form> -->
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import DatePicker from "src/components/DatePicker.vue";
import { useTicketsStore } from "stores/tickets";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "stores/user";
import { useQuasar } from "quasar";
const tickets = useTicketsStore();
const router = useRouter();
onMounted(() => {
  tickets.setTicketsSearch(
    paramsElements[0],
    paramsElements[1],
    paramsElements[8]
  );
});
const $q = useQuasar();
const userRefernce = useUserStore();

const route = useRoute();
const info = route.params.info.toString();
const paramsElements = info.split("_");

const array = paramsElements[5].split(",");
const typeOfDocument = ["Паспорт РФ", "Св. о рождении", "Загран. паспорт"];
const firstName = ref("");
const lastName = ref("");
const surname = ref("");
const documnet = ref(typeOfDocument[0]);
const place = ref(null);
const serial = ref(null);
const numberSerial = ref(null);
const date = ref(null);
const phone = ref(null);
const email = ref(null);
function handleDate(time) {
  date.value = time;
}
const from = paramsElements[0] + " " + paramsElements[3];
const to = paramsElements[1] + " " + paramsElements[4];
async function onSubmit() {
  console.log(tickets.tickets);

  await tickets.updateFreePlaces(
    place.value,
    array,
    paramsElements[9],
    paramsElements[8]
  );

  await userRefernce.saveTicketToUser(
    firstName.value,
    lastName.value,
    surname.value,
    documnet.value,
    place.value,
    serial.value,
    numberSerial.value,
    date.value,
    phone.value,
    email.value,
    from,
    to,
    paramsElements[8],
    makeid(10)
  );
  $q.notify({
    message: `Билет успешно приобретен!`,
    color: "green",
  });
  return router.push({
    name: "Index",
  });
}

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
</script>

<style scoped lang="scss">
.mainContainer {
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 900px;
  margin: 50px auto;
  padding: 15px;
  display: flex;
  height: 500px;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  @media (max-width: 960px) {
    flex-wrap: wrap;
    width: auto;
    height: auto;
  }
}
.myForm {
  display: flex;
  flex-direction: column;
  width: 700px;
  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: auto;
    padding: 5px;
  }
}
.inputField {
  width: 150px;
  margin-top: 7px;
}
/* .header {
  display: flex;
  font-size: 40px;
  line-height: normal;
  color: var(--q-primary);
  margin-bottom: 10px;
}
.nameRow {
  display: flex;
  flex-direction: row;
  width: auto;
  justify-content: space-between;
  margin: 10px auto;
}
.inputField {
  width: 150px;
  margin-right: 5px;
}
.formContainer {
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: white;
  width: 900px;
  height: 600px;
}
*/
.inputRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 960px) {
    flex-direction: column;
    margin-bottom: 5px;
  }
}
.infoSection {
  font-size: 25px;
  height: 100%;
  padding: 15px;
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 960px) {
    font-size: 14px;
    flex: 1;
  }
}

.inputSection {
  height: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 3;
}
.inputSectionHeader {
  font-size: 30px;
  margin: 20px auto;
}
.fromToContaier {
  font-size: 25px;
  padding-left: 20px;
}

.infoSectionHeader {
  text-align: center;
  margin: 20px auto;
  font-size: 29px;
}

.headerInfo {
  font-size: 25px;
}
</style>
