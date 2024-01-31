<template>
  <q-page>
    <div class="fixed-center">
      <div :class="$style.form">
        <div :class="$style.formHeader">
          {{ props.title }}
        </div>
        <slot></slot>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style module scoped lang="scss">
.mainContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 100%;
  @media (max-width: 960px) {

    width: 300px;
  }
}
.form {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #ffff;
  padding: 12px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 960px) {
    width: 300px;
  }
}
.formHeader {
  font-size: 20px;
  padding-bottom: 10px;
}
</style>
