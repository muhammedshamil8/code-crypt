<template>
  <div>
    <div v-if="tasks.length">
      <h3>My Tasks:</h3>
      <div class="task-card-parent">
        <div v-for="task in tasks" :key="task.task_id" class="task-card">
          <div
            class="start-card"
            @click="toggleDetails(task.task_id)"
            :style="{ background: task.gradient }"
            :tabindex="0"
            :aria-expanded="isActive(task.task_id)"
          >
            <p class="task-name">{{ task.task_name }}</p>
            <img src="../../public/arrow.svg" alt="btn" class="arrow-btn" />
          </div>
          <div
            class="details-card"
            :class="{ active: isActive(task.task_id) }"
            :aria-hidden="!isActive(task.task_id)"
            :aria-labelledby="'task-' + task.task_id"
          >
            <p><b>Task Type</b><br />{{ task.task_type }}</p>
            <p><b>Description</b><br />{{ task.description }}</p>
            <p><b>End Date</b><br />{{ task.startDate }}</p>
            <p><b>Priority</b><br />{{ task.priority }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Dashboard',
  data() {
    return {
      tasks: [],
      activeTasks: {},
      gradientColors: [
        'linear-gradient(to top, #000, #feb47b)',
        'linear-gradient(to top,#000, #7F7FD5, #86A8E7, #91EAE4)',
        'linear-gradient(to top,#000, #fc6076, #ff9a44)',
        'linear-gradient(to top,#000, #2196F3, #4CAF50)',
        'linear-gradient(to top,#000, #fc4a1a, #f7b733)',
      ],
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await axios.get(`http://localhost:9000/api/tasks/${userId}`);
        this.tasks = response.data.map((task, index) => ({
          ...task,
          gradient: `${this.gradientColors[index % this.gradientColors.length]}, black`,
        }));
        this.tasks.forEach((task) => {
          // this.$set(this.activeTasks, task.task_id, false);
        });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    toggleDetails(taskId) {
      this.$set(this.activeTasks, taskId, !this.activeTasks[taskId]);
    },
    isActive(taskId) {
      return this.activeTasks[taskId];
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style>
/* Your existing styles here */

.start-card {
  background-size: 200% 100%;
  transition: background-position 0.3s ease;
}

.start-card:hover {
  background-position: right center;
}
.start-card:focus {
  outline: 2px solid #3498db;
}

.task-card-parent {
  display: flex;
  overflow-x: auto;
}

.task-card {
  border: 2px solid #fff;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  margin: 15px;
}

.start-card {
  list-style-type: none;
  margin: 10px;
  min-height: 220px;
  min-width: 180px;
  position: relative;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.arrow-btn {
  position: absolute;
  bottom: 2px;
  right: 5px;
}

.task-name {
  position: absolute;
  bottom: 10px;
  left: 18px;
  font-weight: bold;
  color: #f36804;
}

.details-card {
  display: none;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 10px;
  min-height: 250px;
}

.details-card.active {
  display: grid;
}

.task-card-parent::-webkit-scrollbar {
  height: 10px;
}

.task-card-parent::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 5px;
}

.task-card-parent::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.task-card-parent {
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
}

.task-card-parent::-moz-scrollbar {
  width: 10px;
}

.task-card-parent::-moz-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 5px;
}

.task-card-parent::-moz-scrollbar-track {
  background-color: #f1f1f1;
}
</style>
