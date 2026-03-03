<script setup>
import Todo from './Todo.vue'
</script>

<template>
  <ul class="list-group w-50 m-auto" v-for="todo of todos" :key="todos._id">
    <Todo v-bind:todo="todo" />
  </ul>
  <!-- Delete all completed todos -->
  <button v-on:click.prevent="deleteDone(todos)" class="btn border">Delete Completed</button>
</template>

<script>
import axios from "axios";

function sortDone(x, y) {
  return (x.done == y.done) ? 0 : x.done ? 1 : -1;
}

export default {
  data() {
    return {
      todos: [],
      errors: []
    }
  },
  async created() {
    try {
      const response = await axios.get(`http://localhost:3000/todo`);
      this.todos = response.data.sort(sortDone);
    } catch (err) {
        console.log(err);
        this.errors.push(err);
    }
  },
  methods: {
    // Delete all completed todos
    // NOTE: This breaks sometimes, I originally thought that it was because
    // the array itself was being looped over so I switched to using an array
    // of IDs, which also didn't work. I'll have to keep looking to figure out
    // why it errors. You may have to remove a task from the list yourself.
    deleteDone() {
      // Store all of the IDs first, so deleting a to-do doesn't mess up
      // the array.
      let ids = [];

      this.todos.forEach(todo => {
        if (todo.done) ids.push(todo.id);
      });

      ids.forEach(id => {
        axios.delete(`http://localhost:3000/todo/${id}`, {data: {id}})
          .catch((err) => console.log(err));
      });

      location.reload(); // refresh window
    },
  }
}
</script>