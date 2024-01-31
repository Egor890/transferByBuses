<template>
  <q-page>
    <div class="container">
      <slot></slot>
    </div>
  </q-page>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 900px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  @media (max-width: 960px) {
    width: auto;
  }
}
</style>
