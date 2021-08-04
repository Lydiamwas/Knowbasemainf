<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="kbdoc.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="kbdoc.description"
          name="description"
        />
      </div>
      
        
      <button @click="saveKbdoc" class="btn btn-success">Submit</button>


       
    </div>
     

    <div v-else>
      <h4>Submitted successfully!</h4>
      <button class="btn btn-success" @click="newKbdoc">Add</button>
    </div>
  </div>
</template>

<script>

import KbdocDataService from "../Services/KbdocDataService";


export default {
  name: "add-kbdoc",
  data() {
    return {
      kbdoc: {
        id: null,
        title: "",
        description: "",
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
  },
};





</script>


<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>