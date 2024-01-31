<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="bg-primary text-white"
      height-hint="98"
      align="center"
    >
      <q-tabs align="center">
        <q-route-tab label="Project Bus" @click="$router.push({ path: '/' })" />
        <q-route-tab v-if="userInfoStore.isAdmin" to="/Admin" label="Админка" />
        <template v-if="!userInfoStore.isAuth"
          ><q-route-tab
            label="Зарегистрироваться"
            @click="handleSignUp"
            to="/SignUp"
          />
          <q-route-tab label="Войти" @click="handleSignIn" to="/SignIn" />
        </template>
        <template v-else>
          <q-route-tab
            :label="userInfoStore.email"
            :to="{ name: 'ProfileDefault' }"
          />
          <q-route-tab label="Выйти" @click="handleSignOut" />
        </template>
      </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup="ts">
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useQuasar, Cookies } from "quasar";
import { useUserStore } from "stores/user";
import { getAuth } from "firebase/auth";

const userInfoStore = useUserStore();

const $q = useQuasar();
const router = useRouter();
onMounted(() => {
  userInfoStore.setUserSettings();
});
function handleSignUp() {
  return router.push({
    path: "/SignUp",
  });
}
function handleSignIn() {
  return router.push({
    path: "/SignIn",
  });
}

function handleSignOut() {
  const auth = getAuth();
  Cookies.remove("email");
  signOut(auth)
    .then(() => {
      userInfoStore.email = null;
      $q.notify({
        message: "Вы успешно вышли",
        color: "green",
      });
      return router.push({
        path: "/",
      });
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
</script>
