<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          ref="title"
          required
          v-model="title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          ref="description"
          required
          v-model="description"
          name="description"
        />
      </div>
      <div class="form-group">
        <label for="file">Upload File:</label>
        <input
          type="file"
          ref="file"
          required
          class="form-control"
          v-on:change="handleFilesUpload()"
        />
      </div>

      <button @click="submitData" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>Submitted successfully!</h4>
      <button class="btn btn-success" @click="newKbdoc">Add</button>
    </div>
  </div>
</template>

<script>
import KbdocDataService from "../Services/KbdocDataService";
import axios from "axios";
import router from "../router";
export default {
  name: "add-kbdoc",
  data() {
    return {
      id: null,
      title: "",
      description: "",
      file: "",
      kbdoc: {
        published: false,
      },
      submitted: false,
    };
  },

  methods: {
    saveKbdoc() {
      var data = {
        title: this.kbdoc.title,
        description: this.kbdoc.description,
      };

      KbdocDataService.create(data)
        .then((response) => {
          this.kbdoc.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newKbdoc() {
      this.submitted = false;
      this.kbdoc = {};
    },
    // handle
    submitData() {
      console.log("TITLE", this.title);
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("file", this.file);

      axios
        .post(
          "http://localhost:5000/file/api/file/upload",
          formData,

          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
      router.push("kbdocs");
    },
    handleFilesUpload() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    //
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
