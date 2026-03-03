<template>
  <h1>Contacts</h1>
  <ul v-for="contact of contacts" :key="contact._id">
    <li>{{ contact.firstname }} {{ contact.lastname }}<br>{{ contact.email }}</li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      contacts: [],
      errors: []
    }
  },

  async created() {
    try {
      const response = await axios.get(`http://localhost:3000/contact`);
      this.contacts = response.data;
      console.log(response.data);
    } catch (err) {
        this.errors.push(err);
    }
  }
}
</script>

<style>
</style>
