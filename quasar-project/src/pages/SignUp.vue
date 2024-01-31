<template>
  <ScaffoldCard title="Регистрация">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-input
        :class="$style.inputItem"
        label="Email"
        v-model="email"
        type="email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
      />
      <q-input
        type="password"
        :class="$style.inputItem"
        label="Пароль"
        v-model="password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
      />
      <q-input
        type="password"
        :class="$style.inputItem"
        label="Повторите пароль"
        v-model="passwordConfirm"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
      />
      <q-space />
      <div style="display: flex; align-items: center; justify-content: center">
        <q-btn
          :class="$style.btnSbmit"
          label="Регистрация"
          @click="onSubmit"
          style="background: var(--q-primary); color: white"
        />
      </div>
    </q-form>
  </ScaffoldCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "boot/firebase";
import ScaffoldCard from "src/components/ScaffoldCard.vue";
import { useRouter } from "vue-router";
import { useQuasar, Cookies } from "quasar";
const router = useRouter();
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const user = ref();
const $q = useQuasar();
function onSubmit() {
  if (password.value === passwordConfirm.value) {
    createUserWithEmailAndPassword(firebaseAuth, email.value, password.value)
      .then((userCredential) => {
        // Signed up
        user.value = userCredential.user;
        Cookies.set("email", userCredential.user.email);
        $q.notify({
          message: "Регистрация прошла успешно",
          color: "green",
        });
        return router.push({
          path: "/",
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        $q.notify({
          message: "Ошибка",
          color: "red",
        });
        // ..
      });
    console.log(user);
  } else {
    $q.notify({
      message: "Пароли не совпадают",
      color: "red",
    });
  }
}
</script>

<style module lang="scss" scoped>
.btnSbmit {
  width: 200px;
  margin: 0 auto;
}
.mainContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  width: 100%;
  min-width: 400px;
  height: 100vh;
}
.form {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  margin: 0 auto;
  width: 550px;
  background-color: #ffff;
  padding: 12px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.formHeader {
  font-size: 20px;
  padding-bottom: 10px;
}
</style>
