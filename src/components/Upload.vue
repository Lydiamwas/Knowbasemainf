<template>
  <div class="container">
    <h1 class="text-center">Knowledgebase Uploads</h1>
    <form>
      <div class="form-group">
        <label for="file">Upload Multiple Files:</label>
        <input
          type="file"
          ref="file"
          required
          class="form-control"
          v-on:change="handleFilesUpload()"
        />
      </div>

      <div class="form-group">
        <button class="btn btn-danger btn-block" v-on:click="submitFiles()">
          Upload File
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Upload",
  data() {
    return {
      file: "",
    };
  },

  methods: {
    handleFilesUpload() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },

    submitFiles() {
      let formData = new FormData();
      formData.append("file", this.file);
   
      axios
        .post("http://localhost:5000/file/api/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
  },
};
</script>
