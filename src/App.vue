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
      <div class="container">
        <h4> Upload Files</h4>
     </div>
      <upload></upload>
  </div>
  
</template>

<script>
import Upload from "./components/Upload";
export default {
  name: "App",
  components: {
    Upload
  }
};
</script>


