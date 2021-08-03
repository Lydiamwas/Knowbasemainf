<template>
  <div class="container">
    <h1 class="text-center">Knowledgebase Uploads</h1>
    <form>
      <div class="form-group">
        <label for="file">Upload Multiple Files:</label>
        <input
          type="file"
          name="file"
          required
          multiple
          id=""
          class="form-control"
          v-on:change="handleFilesUpload()"
        />
      </div>

      <div class="form-group">
        <button class="btn btn-danger btn-block" v-on:click="submitFiles()">Upload Files</button>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Upload",
  /*
      Defines the data used by the component
    */
  data() {
    return {
      files: []
    };
  },
  // mounted() {
  //   let recaptchaScript = document.createElement("script");
  //   recaptchaScript.setAttribute(
  //     "src",
  //     "https://ajax.googleleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"
  //   );
  //   document.head.appendChild(recaptchaScript);
  // },

  methods: {
    /*
        Submits all of the files to the server
      */
    submitFiles() {
      /*
          Initialize the form data
        */
      let formData = new FormData();

      /*
          Iteate over any file sent over appending the files
          to the form data.
        */
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        formData.append("files[" + i + "]", file);
      }

      /*
          Make the request to the POST /multiple-files URL
        */
      axios
        .post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },

    /*
        Handles a change on the file upload
      */
    handleFilesUpload() {
      this.files = this.$refs.files.files;
    },
  },
};
</script>
