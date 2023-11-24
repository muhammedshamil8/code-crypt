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

      <!-- Add to Project Button -->
      <button class="add-button" @click="handleAddToProject">Add to Project</button>

      <!-- Project Section -->
      <div v-if="showProjectSection" class="project-section">
        <label for="selectedProject">Project</label>
        <select id="selectedProject" name="selectedProject" v-model="inputs.selectedProject" required>
          <option value="">Select a project</option>
          <option v-for="project in projectOptions" :key="project.project_id" :value="project.project_id">
            {{ project.project_name }}
          </option>
        </select>

        <button class="add-button" @click="cancelProject">Cancel</button>
      </div>

      <!-- Submit Button -->
      <div class="submit">
        <button class="add-button submit" type="submit">Submit</button>
      </div>
    </form>

    <!-- Project Form -->
    <form v-else-if="showProjectForm" @submit.prevent="handleProjectSubmit" class="project-form">
      <h1>Create Project</h1>
      <!-- Project Inputs -->
      <div class="create-project">
        <input type="text" placeholder="Project Name" v-model="projectInputs.projectName" required />
        <label for="projectDescription">Description</label>
        <textarea id="projectDescription" name="projectDescription" v-model="projectInputs.projectDescription" rows="3" placeholder="e.g., stackup project ..." required></textarea>
      </div>

      <h3>You can Add Team members in the project page</h3>

      <!-- Create Task Button inside Project Form -->
      <button class="add-button" @click="createTaskInProjectForm">Create Task</button>

      <!-- Submit Button for Project Form -->
      <div class="submit">
        <button class="add-button" type="submit">Submit</button>
      </div>
    </form>

    <!-- Error Messages -->
    <div v-if="errors && Object.keys(errors).length > 0" class="error-message">
      <p v-for="(value, key) in errors" :key="key" class="error-message">{{ value }}</p>
    </div>
  </div>
</template>

<script>
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
        selectedProject: '',
      },
      showTaskForm: false,
      showProjectForm: false,
      showProjectSection: false,
      projectInputs: {
        projectName: '',
        projectDescription: '',
      },
      projectOptions: [], // Assuming this array is populated dynamically
      errors: {},
    };
  },
  methods: {
    handleSubmit() {
      // Your submit logic for tasks
    },
    handleProjectSubmit() {
      // Your submit logic for projects
    },
    handleAddToProject() {
      this.showProjectSection = true;
    },
    cancelProject() {
      this.showProjectSection = false;
    },
    toggleForm() {
      // Toggle between task and project forms
      this.showTaskForm = !this.showTaskForm;
      this.showProjectForm = !this.showProjectForm;
      this.showProjectSection = false; // Hide project section
    },
    createTaskInProjectForm() {
      // Additional logic for creating a task while in the project form
      console.log('Creating task in project form');
    },
  },
};
</script>

<style scoped>
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
}

.success-message {
  color: green;
}
</style>
