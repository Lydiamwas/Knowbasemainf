<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Kbdocs List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(kbdoc, index) in kbdocs"
          :key="index"
          @click="setActiveKbdoc(kbdoc, index)"
        >
          {{ kbdoc.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllKbdocs">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentKbdoc">
        <h4>Kbdoc</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentKbdoc.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentKbdoc.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentKbdoc.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning" :href="'/kbdocs/' + currentKbdoc.id">
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Kb-documentation...</p>
      </div>
    </div>
  </div>
</template>

<script>
import KbdocDataService from "../Services/KbdocDataService";

export default {
  name: "kbdocs-list",
  data() {
    return {
      kbdocs: [],
      currentKbdoc: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveKbdocs() {
      KbdocDataService.getAll()
        .then((response) => {
          this.kbdocs = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveKbdocs();
      this.currentKbdoc = null;
      this.currentIndex = -1;
    },

    setActiveKbdoc(kbdoc, index) {
      this.currentKbdoc = kbdoc;
      this.currentIndex = index;
    },

    removeAllKbdocs() {
      KbdocDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      KbdocDataService.findByTitle(this.title)
        .then((response) => {
          this.kbdocs = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveKbdocs();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
