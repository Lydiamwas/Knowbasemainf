<template>
  <div v-if="currentKbdoc" class="edit-form">
    <h4>Kbdoc</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentKbdoc.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentKbdoc.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentKbdoc.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentKbdoc.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteKbdoc">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateKbdoc">
      Update
    </button>
    <br />
    <button class="badge badge-success mr-2" @click="downloadDoc">
      Download
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Kbdoc...</p>
  </div>
</template>

<script>
import KbdocDataService from "../Services/KbdocDataService";
import axios from "axios";
export default {
  name: "kbdoc",
  data() {
    return {
      currentKbdoc: null,
      message: "",
    };
  },
  methods: {
    getKbdoc(id) {
      KbdocDataService.get(id)
        .then((response) => {
          this.currentKbdoc = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentKbdoc.id,
        title: this.currentKbdoc.title,
        description: this.currentKbdoc.description,
        published: status,
      };

      KbdocDataService.update(this.currentKbdoc.id, data)
        .then((response) => {
          this.currentKbdoc.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateKbdoc() {
      KbdocDataService.update(this.currentKbdoc.id, this.currentKbdoc)
        .then((response) => {
          console.log(response.data);
          this.message = "The kbdoc was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteKbdoc() {
      KbdocDataService.delete(this.currentKbdoc.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "kbdocs" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    downloadDoc() {
      axios({
        url: `http://localhost:5000/file/api/file/download/${this.currentKbdoc.id}`,
        method: "GET",
        responseType: "blob",
      })
        .then((res) => {
          console.log("download", res.data);
          const fileURL = window.URL.createObjectURL(new Blob([res.data]));
          console.log("fileURL", fileURL);
          const fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.download = this.currentKbdoc.name;
          document.body.appendChild(fileLink);
          fileLink.click();
          document.body.removeChild(fileLink);
          window.URL.revokeObjectURL(fileURL);
        })
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    this.message = "";
    this.getKbdoc(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
