<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">KNOWLEDGEBASE</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/kbdocs" class="nav-link">SPOMDOCS</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add-Doc</router-link>
        </li>
        
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
      <div id="app">
        <Upload/>
      </div>
  </div>
  
</template>

<script>
import Upload from "./components/Upload.vue";

export default {
  name: "app",
  components: {
    Upload
  }
};
</script>

<style>

</style>



