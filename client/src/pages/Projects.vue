<template>
  <div class="projects-container">
    <h2>My Projects</h2>
    <div class="project-cards">
      <div v-for="(project, index) in projects" :key="index" class="project-card" :style="{ backgroundColor: project.color }">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      projects: [
        { title: 'Project A', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod.', color: '#3498db' },
        { title: 'Project B', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', color: '#e74c3c' },
        { title: 'Project C', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', color: '#2ecc71' },
        { title: 'Project D', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', color: '#f39c12' },
        { title: 'Project E', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.', color: '#9b59b6' },
      ],
    };
  },
};
</script>

<style scoped>
.projects-container {
  text-align: center;
}

.project-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.project-card {
  width: 250px;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.project-card:hover {
  transform: scale(1.05);
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

h3 {
  margin-bottom: 10px;
  font-size: 1.5em;
}

</style>
