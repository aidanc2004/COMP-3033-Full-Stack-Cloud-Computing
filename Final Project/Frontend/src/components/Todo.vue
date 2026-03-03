<script setup>
const props = defineProps(["todo"]);
</script>

<template>
  <li class="list-group-item">
    <!-- Checkmark in button -->
    <button v-on:click.prevent="toggleDone(todo.id, todo.done)" class="btn btn-sm border">&#x2713;</button>
    <!-- Give the "done" class if done to add line-through style -->
    <span v-bind:class="(todo.done) ? 'done' : ''" class="px-1">
      {{ todo.name }}
    </span>
    <button v-on:click.prevent="deleteTodo(todo.id)" class="btn btn-sm border">Delete</button>
  </li>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    deleteTodo(id) {
      axios.delete(`http://localhost:3000/todo/${id}`, {data: {id}})
        .catch((err) => console.log(err))
        .finally(() => location.reload()); // refresh window
    },
    toggleDone(id, done) {
      axios.put(`http://localhost:3000/todo/${id}`, {id, "done": !done})
        .catch((err) => console.log(err))
        .finally(() => location.reload()); // refresh window
    }
  }
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>