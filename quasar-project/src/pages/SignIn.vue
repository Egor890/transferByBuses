<template>
  <ScaffoldCard title="Авторизация">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-input
        :class="$style.inputItem"
        label="Email"
        v-model="email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        type="email"
      />
      <q-input
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        type="password"
        :class="$style.inputItem"
        label="Пароль"
        v-model="password"
      />
      <q-space />
      <div style="display: flex; align-items: center; justify-content: center">
        <q-btn
          :class="$style.btnSbmit"
          label="Войти"
          @click="onSubmit"
          style="background: var(--q-primary); color: white"
        />
      </div>
    </q-form>
  </ScaffoldCard>
</template>

<script setup>
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "boot/firebase";
import { Cookies } from "quasar";
import { useUserStore } from "stores/user";

const userInfoStore = useUserStore();

const email = ref("");
const password = ref("");
const user = ref();
import { useRouter } from "vue-router";
const router = useRouter();
import { useQuasar } from "quasar";
import ScaffoldCard from "src/components/ScaffoldCard.vue";
const $q = useQuasar();
function onSubmit() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      Cookies.set("email", `${user.email}`);
      userInfoStore.email = user.email;
      $q.notify({
        message: `Вы успешно авторизовались ${user.email}`,
        color: "green",
      });
      return router.push({
        path: "/",
      });
      // ...
    })
    .catch((error) => {
      $q.notify({
        message: "Ошибка авторизации",
        color: "red",
      });
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  console.log(user);
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
