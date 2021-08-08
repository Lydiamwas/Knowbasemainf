<template>
  <div id="app">
    <navbar />
    <div class="container mt-3">
      <router-view />
    </div>
    <app_footer />
  </div>
</template>

<script>
import navbar from "./components/nav_bar.vue";
import app_footer from "./components/footer.vue";
export default {
  name: "app",
  components: {
    navbar,
    app_footer,
  },
};
</script>

<style></style>
