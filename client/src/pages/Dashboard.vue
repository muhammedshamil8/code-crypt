<template>
  <div>
    <h2>This is Dashboard</h2>
    <button @click="fetchTasks">Fetch Tasks</button>
    <div v-if="tasks.length">
      <h3>Tasks:</h3>
      <ul>
        <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
      </ul>
    </div>
    <router-link to="/">Log out</router-link>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      tasks: [],
    };A
  },
  methods: {
    async fetchTasks() {
      try {
        // Replace the URL with the actual endpoint for fetching tasks
        const response = await this.$axios.get('http://localhost:9000/api/tasks');

        // Assuming the API returns an array of tasks
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
  },
};
</script>

<style>
</style>
