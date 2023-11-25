<template>
  <div class="create-task-container">
    <!-- Toggle Button -->
    <button class="toggle-button" @click="toggleForm">Toggle Form</button>

    <!-- Task Form -->
    <form v-if="showTaskForm" @submit.prevent="handleSubmit" class="task-form">
      <h1>Create Task</h1>
      <!-- Task Inputs -->
      <label for="title">Task Name</label>
      <input type="text" id="title" name="title" v-model="inputs.title" placeholder="e.g., index" required />

      <label for="startDate">Start Date</label>
      <input type="date" id="startDate" name="startDate" v-model="inputs.startDate" required />

      <label for="endDate">End Date</label>
      <input type="date" id="endDate" name="endDate" v-model="inputs.endDate" required />

      <label for="taskType">Task Type</label>
      <input type="text" id="taskType" name="taskType" v-model="inputs.taskType" placeholder="e.g., designing" required />

      <label for="priority">Priority</label>
      <select id="priority" name="priority" v-model="inputs.priority" required>
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">High</option>
      </select>

      <label for="description">Description</label>
      <textarea id="description" name="description" v-model="inputs.description" rows="3" placeholder="e.g., stackup designing ..." required></textarea>

      <!-- Submit Button -->
      <button class="add-button submit" type="submit">Create Task</button>
    </form>

    <!-- Project Form -->
    <form v-else-if="showProjectForm" @submit.prevent="handleProjectSubmit" class="project-form">
      <h1>Create Project</h1>
      <!-- Project Inputs -->
      <label for="projectName">Project Name</label>
      <input type="text" id="projectName" name="projectName" v-model="projectInputs.projectName" placeholder="e.g., Project X" required />

      <label for="projectDescription">Description</label>
      <textarea id="projectDescription" name="projectDescription" v-model="projectInputs.projectDescription" rows="3" placeholder="e.g., stackup project ..." required></textarea>

      <!-- Submit Button for Project Form -->
      <button class="add-button submit" type="submit">Create Project</button>
    </form>

    <!-- Error Messages -->
    <div v-if="errors && Object.keys(errors).length > 0" class="error-message">
      <p v-for="(value, key) in errors" :key="key" class="error-message">{{ value }}</p>
    </div>

    <!-- Success Message -->
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputs: {
        title: '',
        startDate: '',
        endDate: '',
        taskType: '',
        priority: '1',
        description: '',
      },
      projectInputs: {
        projectName: '',
        projectDescription: '',
      },
      showTaskForm: true,
      showProjectForm: false,
      errors: {},
      successMessage: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const user_id = localStorage.getItem('user_id'); 
        const payload = { ...this.inputs, user_id };
        console.log('Task Payload:', payload);

        const response = await axios.post('http://localhost:9000/api/create-task', payload);

        if (response.data.status === 1) {
          console.log('Task created successfully:', response.data.message);
          this.successMessage = 'Task created successfully';
          this.clearForm();
          this.errors = {};
          setTimeout(() => {
          this.successMessage = '';
        }, 3000);

        } else {
          console.error('Error creating task:', response.data.message || 'An unknown error occurred');
          this.errors = { task: response.data.message || 'An unknown error occurred' };
          this.successMessage = '';
        }
      } catch (error) {
        console.error('Error creating task:', error.message);
        this.errors = { task: 'An error occurred while creating the task' };
        this.successMessage = '';

      }
    },

    async handleProjectSubmit() {
      try {
        const user_id = localStorage.getItem('user_id'); 
        const payload = { ...this.projectInputs, user_id };

        const response = await axios.post('http://localhost:9000/api/create-project', payload);

        if (response.data.status === 1) {
          console.log('Project created successfully:', response.data.message);
          this.successMessage = 'Project created successfully';
          this.errors = {};
          setTimeout(() => {
          this.successMessage = '';
        }, 3000);
          // Optionally, you can reset the form or perform other actions after successful submission
        } else {
          console.error('Error creating project:', response.data.message);
          this.errors = { project: response.data.message };
          this.successMessage = '';

        }
      } catch (error) {
        console.error('Error creating project:', error);
        this.errors = { project: 'An error occurred while creating the project' };
        this.successMessage = '';

      }
    },

    toggleForm() {
      this.showTaskForm = !this.showTaskForm;
      this.showProjectForm = !this.showProjectForm;
      this.errors = {};
      this.successMessage = ''; // Clear success message when switching forms
    },

    clearForm() {
      // Reset form fields
      this.inputs.title = '';
      this.inputs.startDate = '';
      this.inputs.endDate = '';
      this.inputs.taskType = '';
      this.inputs.priority = '1';
      this.inputs.description = '';
    },
  },
};
</script>

<style scoped>
input{
  padding: 10px;
  border-radius: 5px;
}
select{
  padding: 10px;
  border-radius: 5px;

}
.create-task-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.toggle-button {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

.task-form,
.project-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

textarea {
  resize: vertical;
  border-radius: 5px;

}

.add-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.submit {
  text-align: center;
}

.error-message {
  color: red;
  text-align: center;
  margin: auto;
}

.success-message {
  color: green;
  text-align: center;
  margin: auto;
}
</style>
