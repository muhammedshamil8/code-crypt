<template>
  <div class="home-container">
    <img src="../../public/logo.png" alt="Project Logo" class="logo" />
    <router-link to="/signup" class="get-started-button">Get started</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: fixed;
  bottom: 0%;
  top: 0;
  width: 100%;
  background-color: #000000; /* Dark background color */
 
}


.get-started-button {
  padding: 15px;
  background-color: #3498db; /* Dark blue button color */
  color: white;
  text-decoration: none;
  font-size: 18px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
margin-bottom: 300px;
}

.get-started-button:hover {
  background-color: #2980b9; /* Slightly darker blue on hover */
}

.logo {
  width: 800px; /* Adjust the width as needed */
  margin: auto;
  padding-left: 50px;
}
</style>
