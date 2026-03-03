<template>
  <div class="form-group w-50 pt-4 m-auto">
    <form v-on:submit.prevent="submitForm">
      <label for="name" class="form-label">Name: </label>
      <input type="text" name="name" id="name" v-model="form.name" class="form-control"><br />
      <button type="submit" id="add" class="btn border">Add</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: '',
        id: ''
      },
    }
  },
  methods: {
    submitForm() {
      // NOTE: The chance of two tasks having the same id and existing at the
      // same time is very *very* small, so it's fine for a simple to-do app.
      this.form.id = Math.random();
      axios.post("http://localhost:3000/todo", this.form)
        .catch((err) => console.log(err))
        .finally(() => location.reload()); // refresh window
    }
  }
}
</script>

<style>
</style>